  (function(){
    // Elements
    const displayEl = document.getElementById('display');
    const formulaEl = document.getElementById('formula');

    // State
    let formula = '';        // full formula string using + - * / (operators in JS form)
    let current = '0';       // visible current input (as string)
    let lastWasEquals = false;

    // Helpers
    const operators = ['+','-','*','/'];
    function updateDisplay(){
      displayEl.innerText = current;
      formulaEl.innerText = formula;
    }

    function sanitizeForEval(expr){
      // allow only digits, dot, operators, parentheses, spaces
      // this is a simple whitelist to avoid injection through developer consoles
      if(!/^[0-9+\-*/().\s]+$/.test(expr)) throw new Error('Invalid characters');
      return expr;
    }

    function evaluateExpression(expr){
      try{
        const safe = sanitizeForEval(expr);
        // Evaluate with Function to avoid eval string in global scope
        const result = Function('"use strict"; return (' + safe + ')')();
        // limit to 10 significant decimal places but keep accuracy
        if(typeof result === 'number' && !isFinite(result)) return 'Error';
        if(Number.isInteger(result)) return result.toString();
        // round to 10 decimal places then trim trailing zeros
        const rounded = parseFloat(result.toFixed(10)).toString();
        return rounded;
      } catch(e){
        return 'Error';
      }
    }

    // Input handling
    function inputDigit(d){
      if(lastWasEquals){
        // start new calculation after equals if a digit is pressed
        formula = '';
        current = d === '0' ? '0' : d;
        lastWasEquals = false;
        updateDisplay();
        return;
      }
      // prevent multi-leading zeros
      if(current === '0'){
        current = d;
      } else {
        current += d;
      }
      updateDisplay();
    }

    function inputDecimal(){
      if(lastWasEquals){
        // start new number
        formula = '';
        current = '0.';
        lastWasEquals = false;
        updateDisplay();
        return;
      }
      // prevent more than one decimal in current number
      if(current.includes('.')) return;
      current += '.';
      updateDisplay();
    }

    function inputOperator(op){
      // op is one of + - * /
      // If last input was equals, continue from result
      if(lastWasEquals){
        // formula already contains previous result; continue
        formula = displayEl.innerText; // result
        lastWasEquals = false;
      }

      // If current has a value, append it to formula
      if(current !== '') {
        // append current number to formula
        formula = formula + (formula && !/[\+\-\*\/]$/.test(formula) ? '' : '') + current;
        current = '';
      }

      // Now handle consecutive operators:
      // If formula ends with an operator (one or more), handle according to rules:
      // - If new op is '-' allow it as unary negative after another operator (e.g., 5 * - 5)
      // - Otherwise replace trailing operators with the new one (so 5 + * 7 -> 5 * 7)
      if(/[\+\-\*\/]$/.test(formula)){
        // formula ends with operator
        if(op === '-'){
          // allow unary minus only if formula doesn't already end with '-' that is unary
          // We avoid sequences like "+- -" (keep last two if unary)
          // Append unary minus only if previous char is an operator and previous is NOT already '-'
          // Simpler approach: append '-' (so "5 * -")
          formula += '-';
        } else {
          // replace trailing operators possibly including trailing unary minus
          // remove trailing operators and trailing unary minus chunk
          formula = formula.replace(/[\+\-\*\/]+$/, '');
          // then append the operator
          formula += op;
        }
      } else {
        // normal append
        formula += op;
      }

      // Reset current display to show the operator briefly as 0 for clarity
      current = '';
      updateDisplay();
    }

    function handleClear(){
      formula = '';
      current = '0';
      lastWasEquals = false;
      updateDisplay();
    }

    function handleEquals(){
      // Build a complete expression to evaluate
      let expr = formula;

      // If there is a current (unfinished number), append it
      if(current !== '') expr += current;

      // If after building expr it's empty -> keep zero
      if(expr === '') {
        displayEl.innerText = '0';
        formulaEl.innerText = '';
        current = '0';
        return;
      }

      // Replace common UI symbols with JS operators (we store * and / already as JS)
      expr = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');

      // Edge-case: expression may end in operator(s) -> trim trailing operators
      expr = expr.replace(/[\+\-\*\/]+$/,''); // remove trailing ops

      if(expr === '') { displayEl.innerText = '0'; formula = ''; current='0'; return; }

      // Evaluate
      const result = evaluateExpression(expr);
      // Show both formula and result per typical calculator patterns
      formula = expr + ' =';
      current = (result === 'Error') ? 'Error' : result;
      lastWasEquals = true;
      updateDisplay();
    }

    // Wire buttons
    const map = {
      'zero': () => inputDigit('0'),
      'one': () => inputDigit('1'),
      'two': () => inputDigit('2'),
      'three': () => inputDigit('3'),
      'four': () => inputDigit('4'),
      'five': () => inputDigit('5'),
      'six': () => inputDigit('6'),
      'seven': () => inputDigit('7'),
      'eight': () => inputDigit('8'),
      'nine': () => inputDigit('9'),
      'decimal': inputDecimal,
      'add': () => inputOperator('+'),
      'subtract': () => inputOperator('-'),
      'multiply': () => inputOperator('*'),
      'divide': () => inputOperator('/'),
      'clear': handleClear,
      'equals': handleEquals
    };

    Object.keys(map).forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      el.addEventListener('click', (e) => {
        e.preventDefault();
        map[id]();
      });
    });

    // Keyboard support (optional but convenient)
    document.addEventListener('keydown', (e) => {
      const k = e.key;
      if(/\d/.test(k)){
        // digits
        inputDigit(k);
      } else if(k === '.' ) {
        inputDecimal();
      } else if(k === '+' || k === '-' || k === '*' || k === '/') {
        inputOperator(k);
      } else if(k === 'Enter' || k === '=') {
        e.preventDefault();
        handleEquals();
      } else if(k === 'Backspace') {
        // simple backspace: edit current number if possible
        if(lastWasEquals){
          // after equals, Backspace resets
          handleClear();
          return;
        }
        if(current.length > 0){
          current = current.slice(0, -1);
          if(current === '') current = '0';
          updateDisplay();
        } else {
          // if current is empty, remove last item from formula
          formula = formula.replace(/[\+\-\*\/]$|[0-9.]+$/,'');
          updateDisplay();
        }
      }
    });

    // Initialize
    handleClear();

    // make display updates visible to FCC tests ASAP
    updateDisplay();

  })();
