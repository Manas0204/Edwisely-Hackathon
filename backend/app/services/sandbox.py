import subprocess
import tempfile
import os
import json
import sys

MAX_CODE_SIZE = 50000
TIMEOUT = 5


def execute_sandboxed_code(user_code: str, test_suite: str) -> dict:

    # 🚫 Prevent huge payloads
    if len(user_code) > MAX_CODE_SIZE:
        return {
            "success": False,
            "passed_tests": 0,
            "total_tests": 1,
            "console_output": "",
            "error_output": "Code too large"
        }

    # Combine user code + test suite
    combined_script = user_code + "\n" + test_suite

    # Write temp file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(combined_script)
        path = f.name

    try:
        result = subprocess.run(
            [sys.executable, path],
            capture_output=True,
            text=True,
            timeout=TIMEOUT
        )

        output = (result.stdout or "").strip()
        errors = (result.stderr or "").strip()

        # 🔍 Try extracting JSON result from output
        lines = output.split("\n")

        result_data = None
        for line in reversed(lines):
            try:
                result_data = json.loads(line)
                break
            except:
                continue

        # ❌ No valid JSON returned
        if not result_data:
            return {
                "success": False,
                "passed_tests": 0,
                "total_tests": 1,
                "console_output": output,
                "error_output": errors or "Code crashed before returning results"
            }

        # ✅ Valid execution
        return {
            "success": result.returncode == 0,
            "passed_tests": result_data.get("passed", 0),
            "total_tests": result_data.get("total", 1),
            "console_output": output,
            "error_output": errors
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "passed_tests": 0,
            "total_tests": 1,
            "console_output": "",
            "error_output": "Execution Timeout (possible infinite loop)"
        }

    except Exception as e:
        return {
            "success": False,
            "passed_tests": 0,
            "total_tests": 1,
            "console_output": "",
            "error_output": f"Execution failed: {str(e)}"
        }

    finally:
        # 🧹 Always clean temp file
        try:
            if os.path.exists(path):
                os.remove(path)
        except:
            pass