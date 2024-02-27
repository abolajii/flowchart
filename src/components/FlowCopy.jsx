import "reactflow/dist/style.css";

import ReactFlow, { Controls } from "reactflow";

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: aliceblue;
  display: grid;
  place-items: center;

  .inner {
    height: 700px;
    width: 900px;
  }
`;

const FlowCopy = () => {
  //
  const allNodesClone = [
    { id: "1", data: { label: "Chart" }, position: { x: 300, y: 0 } },
    {
      id: "2",
      data: { label: "Assets (ASST)" },
      position: { x: 0, y: 100 },
      subChildren: [
        {
          id: "7",
          data: { label: "Test asset primum ledger 120 (ASSTOTFR)" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [],
        },
        {
          id: "8",
          data: { label: "Recurrent asset primum (ASSTOTFR)" },
          position: { x: 160, y: 180 },
          subChildrenTwo: [],
        },
        {
          id: "9",
          data: { label: "New asset parent 99 (ASSTOTFR)" },
          position: { x: 320, y: 180 },
          subChildrenTwo: [],
        },
        {
          id: "10",
          data: { label: "Test revenue primum ledger 176 (ASSTOTFR)" },
          position: { x: 480, y: 180 },
          subChildrenTwo: [],
        },
        {
          id: "11",
          data: { label: "Parent expense (ASSTOTFR)" },
          position: { x: 640, y: 180 },
          subChildrenTwo: [],
        },
      ],
    },
    {
      id: "3",
      data: { label: "Liabilities" },
      position: { x: 160, y: 100 },
      subChildren: [
        {
          id: "12",
          data: { label: "Test Liability Primum Ledger 1 (LIAMUR)" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [],
        },
        {
          id: "13",
          data: { label: "New Liability Parent	(LIANLP)" },
          position: { x: 160, y: 180 },
          subChildrenTwo: [],
        },
      ],
    },
    {
      id: "4",
      data: { label: "Equities" },
      position: { x: 320, y: 100 },
      subChildren: [
        {
          id: "14",
          data: { label: "Test Equity Primum Ledger 1	(EQT0VTR)" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [],
        },
      ],
    },
    {
      id: "5",
      data: { label: "Revenue" },
      position: { x: 480, y: 100 },
      subChildren: [
        {
          id: "15",
          data: { label: "Gross Revenue	(REV0GRR)" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [],
        },
      ],
    },
    {
      id: "6",
      data: { label: "Expense" },
      position: { x: 640, y: 100 },
      subChildren: [
        {
          id: "16",
          data: { label: "Test Expense Primum Ledger 1 (EXP0BYT)" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [],
        },
      ],
    },
  ];

  const _initialEdges = [
    { id: "el-2", source: "1", target: "2" },
    { id: "el-3", source: "1", target: "3" },
    { id: "el-4", source: "1", target: "4" },
    { id: "el-5", source: "1", target: "5" },
    { id: "el-6", source: "2", target: "7" },
    { id: "el-7", source: "2", target: "8" },
    { id: "el-8", source: "2", target: "9" },
    { id: "el-9", source: "2", target: "10" },
    { id: "el-10", source: "2", target: "11" },
  ];

  // Extract sub-children of B
  const subChildrenOfB =
    allNodesClone.find((node) => node.id === "2")?.subChildren || [];
  const subChildrenTwoOfB1 =
    subChildrenOfB.find((node) => node.id === "6")?.subChildrenTwo || [];

  const _initialNodes = [
    ...allNodesClone,
    ...subChildrenOfB,
    ...subChildrenTwoOfB1,
  ];

  const [initialNodes, setInitialNodes] = React.useState(_initialNodes);
  const [initialEdges, setInitialEdges] = React.useState(_initialEdges);

  const onNodesChange = (nodesArray) => {
    if (nodesArray[0].type === "select") {
      const selectedNode = nodesArray.find((node) => node.selected);

      if (selectedNode) {
        const selectedNodeId = selectedNode.id;
        const selectedNodeData = initialNodes.find(
          (node) => node.id === selectedNodeId
        );

        const allSubChildren = getSubChildren(selectedNodeData);
        const allSubChildrenTwo = getSubChildrenTwo(allSubChildren);

        const allNodesAndSubChildren = [
          ...allNodesClone,
          ...allSubChildren,
          ...allSubChildrenTwo,
        ];

        const allNodesId = allNodesClone.map((node) => ({
          id: node.id,
          data: node.data,
        }));

        const newEdges = createEdges(
          allNodesId,
          {
            id: selectedNodeData.id,
            data: selectedNodeData.data,
            position: selectedNodeData.position,
          },
          allSubChildren,
          allSubChildrenTwo
        );

        setInitialEdges(newEdges.slice(1));
        setInitialNodes(allNodesAndSubChildren);
      }
    }
  };

  const getSubChildren = (node) => {
    const subChildren = node?.subChildren;
    return subChildren;
  };

  const getSubChildrenTwo = (node) => {
    const subChildrenTwo = node[0]?.subChildrenTwo;
    return subChildrenTwo;
  };

  const createEdges = (
    allNodesId,
    parentNode,
    subChildren,
    allSubChildrenTwo
  ) => {
    let edges = [];

    allNodesId.forEach((nodeId) => {
      edges.push({
        id: `el-${nodeId.id}`,
        source: "1",
        target: nodeId.id,
      });
    });

    // // Create edges for parent node to its immediate subchildren
    subChildren.forEach((subChild) => {
      edges.push({
        id: `el-${parentNode.id}-${subChild.id}`,
        source: parentNode.id,
        target: subChild.id,
      });
    });

    const subChildrenSource = subChildren[0].id;
    // // Create edges for parent node to its immediate subchildren
    allSubChildrenTwo.forEach((subChild) => {
      edges.push({
        id: `el-${subChildrenSource}-${subChild.id}`,
        source: subChildrenSource,
        target: subChild.id,
      });
    });

    return edges;
  };

  return (
    <Container>
      <div className="inner">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
        >
          <Controls />
        </ReactFlow>
      </div>
    </Container>
  );
};

export default FlowCopy;
