import React, { useState } from "react";

const treeData = {
  License: ["Consumption", "Contract"],
  Budget: ["Metrics budget", "Traces budget", "Logs budget"],
  Analyze: [
    { type: "header", label: "METRICS" },
    "Live metrics",
    "Metrics usage",
    "Metrics queries",
    { type: "header", label: "TRACES" },
    "Live traces",
    "Trace usage",
    "Trace volume",
    { type: "header", label: "LOGS" },
    "Logs usage",
    "Logs volume"
  ],
  Control: [
    "Recommendations",
    { type: "header", label: "METRICS" },
    "Aggregation rules",
    "Drop rules",
    "Recording rules",
    { type: "header", label: "TRACES" },
    "Head sampling rules",
    "Tail sampling rules",
    "Behaviors",
    "Trace metrics",
    { type: "header", label: "LOGS" },
    "Control rules"
  ],
  Configure: [
    "Scope configuration",
    "Service configuration",
    "Logs configuration",
    "Retention polices",
    "Derived labels",
  ],
  Manage: [
    "Audit logs",
    "Integrations",
    "Users",
    "Teams",
    "Collections",
  ],
};

const TreeNode = ({ label, children, isHeader = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="pl-4">
      <div
        className={`py-2 px-3 ${isHeader ? "uppercase text-xs font-bold text-black" : "cursor-pointer border rounded hover:bg-gray-100"}`}
        onClick={!isHeader && children ? toggle : undefined}
      >
        {label} {!isHeader && children ? <span>{isOpen ? "▾" : "▸"}</span> : null}
      </div>
      {isOpen && children && <div className="pl-4">{children}</div>}
    </div>
  );
};

const renderTree = (node) => {
  if (Array.isArray(node)) {
    return node.map((item, index) => {
      if (typeof item === "string") {
        return <TreeNode key={index} label={item} />;
      } else if (item.type === "header") {
        return <TreeNode key={index} label={item.label} isHeader={true} />;
      }
      return null;
    });
  }
  if (typeof node === "object" && node !== null) {
    return Object.entries(node).map(([key, value]) => (
      <TreeNode key={key} label={key}>{renderTree(value)}</TreeNode>
    ));
  }
  return null;
};

export default function TreeView() {
  return <div className="p-4 max-w-md mx-auto">{renderTree(treeData)}</div>;
}
