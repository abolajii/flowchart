import "reactflow/dist/style.css";

import ReactFlow, { Controls } from "reactflow";

import React from "react";

const FlowChart = () => {
  const containerRef = React.useRef();

  const firstNode = {
    id: "1",
    position: { x: 300, y: 0 },
    data: { label: "A" },
  };

  const _initialNodes = [
    firstNode,
    {
      id: "2",
      position: { x: -160, y: 100 },
      data: { label: "B" },
      subChildren: [
        { id: "7", position: { x: -160, y: 200 }, data: { label: "B1" } },
        { id: "8", position: { x: 0, y: 200 }, data: { label: "B2" } },
        { id: "9", position: { x: 160, y: 200 }, data: { label: "B3" } },
        { id: "10", position: { x: 320, y: 200 }, data: { label: "B4" } },
        { id: "11", position: { x: 480, y: 200 }, data: { label: "B5" } },
        { id: "12", position: { x: 640, y: 200 }, data: { label: "B6" } },
      ],
    },
    {
      id: "3",
      position: { x: 0, y: 100 },
      data: { label: "C" },
      subChildren: [
        { id: "13", position: { x: -160, y: 200 }, data: { label: "C1" } },
        { id: "14", position: { x: 0, y: 200 }, data: { label: "C2" } },
        { id: "15", position: { x: 160, y: 200 }, data: { label: "C3" } },
        { id: "16", position: { x: 320, y: 200 }, data: { label: "C4" } },
        { id: "17", position: { x: 480, y: 200 }, data: { label: "C5" } },
        { id: "18", position: { x: 640, y: 200 }, data: { label: "C6" } },
      ],
    },
    {
      id: "4",
      position: { x: 160, y: 100 },
      data: { label: "D" },
      subChildren: [
        { id: "19", position: { x: -160, y: 200 }, data: { label: "D1" } },
        { id: "20", position: { x: 0, y: 200 }, data: { label: "D2" } },
        { id: "21", position: { x: 160, y: 200 }, data: { label: "D3" } },
        { id: "22", position: { x: 320, y: 200 }, data: { label: "D4" } },
        { id: "23", position: { x: 480, y: 200 }, data: { label: "D5" } },
        { id: "24", position: { x: 640, y: 200 }, data: { label: "D6" } },
      ],
    },
    { id: "5", position: { x: 320, y: 100 }, data: { label: "E" } },
    { id: "6", position: { x: 480, y: 100 }, data: { label: "F" } },
  ];

  const [initialNodes, setInitialNodes] = React.useState(_initialNodes);
  //   const [offSetWidth, setOffSetWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef?.current) {
        // setOffSetWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialEdges = [
    { id: "e1-1", source: "1", target: "2" },
    { id: "el-2", source: "2", target: "7" },
    { id: "el-3", source: "2", target: "8" },
    { id: "el-4", source: "2", target: "9" },
    { id: "el-5", source: "2", target: "10" },
    { id: "el-6", source: "2", target: "11" },
    { id: "el-7", source: "2", target: "12" },
    { id: "el-8", source: "2", target: "13" },
  ];

  React.useEffect(() => {
    // set b to initial nodes
    // setInitialNodes([])
  }, []);

  const onNodesChange = (nodesArray) => {
    if (nodesArray[0].type === "select") {
      const selectedNode = nodesArray.filter((node) => node.selected);
      const selectedNodeChildren = initialNodes.filter(
        (node) => node.id === selectedNode[0].id
      );
      const restOfNodes = _initialNodes.slice(0, 6);
      setInitialNodes([
        firstNode,
        ...restOfNodes,
        ...selectedNodeChildren[0].subChildren,
      ]);
    }

    // switch(){

    // }
  };

  const onEdgesChange = () => {
    console.log("Edges clicked");
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={containerRef}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
