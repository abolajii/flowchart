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
  const allNodes = [
    { id: "1", data: { label: "A" }, position: { x: 300, y: 0 } },
    {
      id: "2",
      data: { label: "B" },
      position: { x: 0, y: 100 },
      subChildren: [
        {
          id: "6",
          data: { label: "B1" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [
            { id: "18", data: { label: "B11" }, position: { x: 0, y: 250 } },
            { id: "19", data: { label: "B12" }, position: { x: 160, y: 250 } },
            { id: "20", data: { label: "B13" }, position: { x: 320, y: 250 } },
          ],
        },
        { id: "7", data: { label: "B2" }, position: { x: 160, y: 180 } },
        { id: "8", data: { label: "B3" }, position: { x: 320, y: 180 } },
      ],
    },
    {
      id: "3",
      data: { label: "C" },
      position: { x: 160, y: 100 },
      subChildren: [
        {
          id: "9",
          data: { label: "C1" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [
            { id: "21", data: { label: "C11" }, position: { x: 0, y: 250 } },
            { id: "22", data: { label: "C12" }, position: { x: 160, y: 250 } },
            { id: "23", data: { label: "C13" }, position: { x: 320, y: 250 } },
          ],
        },
        { id: "10", data: { label: "C2" }, position: { x: 160, y: 180 } },
        { id: "11", data: { label: "C3" }, position: { x: 320, y: 180 } },
      ],
    },
    {
      id: "4",
      data: { label: "D" },
      position: { x: 320, y: 100 },
      subChildren: [
        {
          id: "12",
          data: { label: "D1" },
          position: { x: 0, y: 180 },
          subChildrenTwo: [
            { id: "24", data: { label: "D11" }, position: { x: 0, y: 250 } },
            { id: "25", data: { label: "D12" }, position: { x: 160, y: 250 } },
            { id: "26", data: { label: "D13" }, position: { x: 320, y: 250 } },
          ],
        },
        { id: "13", data: { label: "D2" }, position: { x: 160, y: 180 } },
        { id: "14", data: { label: "D3" }, position: { x: 320, y: 180 } },
      ],
    },
    {
      id: "5",
      data: { label: "E" },
      position: { x: 480, y: 100 },

      subChildren: [
        { id: "15", data: { label: "E1" }, position: { x: 0, y: 180 } },
        { id: "16", data: { label: "E2" }, position: { x: 160, y: 180 } },
        { id: "17", data: { label: "E3" }, position: { x: 320, y: 180 } },
      ],
    },
  ];

  const _initialEdges = [
    { id: "el-1", source: "1", target: "1" },
    { id: "el-2", source: "1", target: "2" },
    { id: "el-3", source: "1", target: "3" },
    { id: "el-4", source: "1", target: "4" },
    { id: "el-5", source: "1", target: "5" },
  ];

  const [initialNodes, setInitialNodes] = React.useState(allNodes);
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
          ...allNodes,
          ...allSubChildren,
          ...allSubChildrenTwo,
        ];

        const allNodesId = allNodes.map((node) => ({
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

        setInitialEdges(newEdges);
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
