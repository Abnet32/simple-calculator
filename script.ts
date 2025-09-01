(function () {
  // Elements
  const displayEl = document.getElementById("display") as HTMLElement;
  const formulaEl = document.getElementById("formula") as HTMLElement;

  // State
  let formula: string = ""; // full formula string using + - * /
  let current: string = "0"; // visible current input
  let lastWasEquals: boolean = false;

  // Helpers
  const operators: string[] = ["+", "-", "*", "/"];

  function updateDisplay(): void {
    if (displayEl) displayEl.innerText = current;
    if (formulaEl) formulaEl.innerText = formula;
  }

  function sanitizeForEval(expr: string): string {
    // allow only digits, dot, operators, parentheses, spaces
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) throw new Error("Invalid characters");
    return expr;
  }

  function evaluateExpression(expr: string): string {
    try {
      const safe = sanitizeForEval(expr);
      // Evaluate in local scope
      const result: unknown = Function('"use strict"; return (' + safe + ")")();
      if (typeof result !== "number" || !isFinite(result)) return "Error";

      if (Number.isInteger(result)) return result.toString();

      const rounded = parseFloat(result.toFixed(10)).toString();
      return rounded;
    } catch {
      return "Error";
    }
  }

  // Input handling
  function inputDigit(d: string): void {
    if (lastWasEquals) {
      formula = "";
      current = d === "0" ? "0" : d;
      lastWasEquals = false;
      updateDisplay();
      return;
    }
    if (current === "0") {
      current = d;
    } else {
      current += d;
    }
    updateDisplay();
  }

  function inputDecimal(): void {
    if (lastWasEquals) {
      formula = "";
      current = "0.";
      lastWasEquals = false;
      updateDisplay();
      return;
    }
    if (current.includes(".")) return;
    current += ".";
    updateDisplay();
  }

  function inputOperator(op: string): void {
    if (lastWasEquals) {
      formula = displayEl?.innerText ?? "";
      lastWasEquals = false;
    }

    if (current !== "") {
      formula += current;
      current = "";
    }

    if (/[\+\-\*\/]$/.test(formula)) {
      if (op === "-") {
        formula += "-";
      } else {
        formula = formula.replace(/[\+\-\*\/]+$/, "");
        formula += op;
      }
    } else {
      formula += op;
    }

    current = "";
    updateDisplay();
  }

  function handleClear(): void {
    formula = "";
    current = "0";
    lastWasEquals = false;
    updateDisplay();
  }

  function handleEquals(): void {
    let expr = formula;

    if (current !== "") expr += current;

    if (expr === "") {
      if (displayEl) displayEl.innerText = "0";
      if (formulaEl) formulaEl.innerText = "";
      current = "0";
      return;
    }

    expr = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
    expr = expr.replace(/[\+\-\*\/]+$/, "");

    if (expr === "") {
      if (displayEl) displayEl.innerText = "0";
      formula = "";
      current = "0";
      return;
    }

    const result = evaluateExpression(expr);
    formula = expr + " =";
    current = result === "Error" ? "Error" : result;
    lastWasEquals = true;
    updateDisplay();
  }

  // Wire buttons
  const map: Record<string, () => void> = {
    zero: () => inputDigit("0"),
    one: () => inputDigit("1"),
    two: () => inputDigit("2"),
    three: () => inputDigit("3"),
    four: () => inputDigit("4"),
    five: () => inputDigit("5"),
    six: () => inputDigit("6"),
    seven: () => inputDigit("7"),
    eight: () => inputDigit("8"),
    nine: () => inputDigit("9"),
    decimal: inputDecimal,
    add: () => inputOperator("+"),
    subtract: () => inputOperator("-"),
    multiply: () => inputOperator("*"),
    divide: () => inputOperator("/"),
    clear: handleClear,
    equals: handleEquals,
  };

  Object.keys(map).forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      map[id]();
    });
  });

  // Keyboard support
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const k = e.key;
    if (/\d/.test(k)) {
      inputDigit(k);
    } else if (k === ".") {
      inputDecimal();
    } else if (k === "+" || k === "-" || k === "*" || k === "/") {
      inputOperator(k);
    } else if (k === "Enter" || k === "=") {
      e.preventDefault();
      handleEquals();
    } else if (k === "Backspace") {
      if (lastWasEquals) {
        handleClear();
        return;
      }
      if (current.length > 0) {
        current = current.slice(0, -1);
        if (current === "") current = "0";
        updateDisplay();
      } else {
        formula = formula.replace(/[\+\-\*\/]$|[0-9.]+$/, "");
        updateDisplay();
      }
    }
  });

  // Initialize
  handleClear();
  updateDisplay();
})();
