import React, { useRef, useEffect } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);

  const drawMandelbrot = (ctx, width, height) => {
    const maxIteration = 1000;
    const minX = -2.5,
      maxX = 1;
    const minY = -1,
      maxY = 1;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let x0 = (i / width) * (maxX - minX) + minX;
        let y0 = (j / height) * (maxY - minY) + minY;
        let x = 0,
          y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < maxIteration) {
          let xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iteration++;
        }

        const color = iteration === maxIteration ? "black" : `hsl(0, 100%, ${iteration % 256}%)`;
        ctx.fillStyle = color;
        ctx.fillRect(i, j, 1, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    drawMandelbrot(ctx, width, height);
  }, []);

  return (
    <VStack p={8} spacing={4}>
      <Heading as="h1" size="xl" mb={8}>
        Mandelbrot Set
      </Heading>
      <Box width="100%" overflow="hidden" borderWidth="1px" borderRadius="lg">
        <canvas ref={canvasRef} width="800" height="600"></canvas>
      </Box>
    </VStack>
  );
};

export default Index;
