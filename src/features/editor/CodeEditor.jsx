import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export const CodeEditor = ({ setCode }) => {

  const [value, setValue] = useState(`def fibonacci(n):
    sequence = [0,1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    return sequence
`);

  return (
    <div style={{
      height: "400px",
      border: "1px solid #1e293b",
      borderRadius: "10px",
      overflow: "hidden"
    }}>
      <Editor
        height="100%"
        theme="vs-dark"
        defaultLanguage="python"
        value={value}
        onChange={(val) => {
          setValue(val);
          setCode(val); // 🔥 PASS CODE UP
        }}
      />
    </div>
  );
};