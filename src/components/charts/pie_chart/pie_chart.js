import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {MyContext} from "../../providers/provider";
import { useContext } from "react";

export default function PieArcLabel() {
  const contextData = useContext(MyContext);
  const data = [
    { value: contextData.operations.filter(el => el.type === 'income').reduce((acc, currentValue) => acc + currentValue.price, 0), label: 'Incomes' },
    {value: 0},
    { value: contextData.operations.filter(el => el.type === 'expense').reduce((acc, currentValue) => acc + currentValue.price, 0), label: 'Expenses' },
  ];

  const size = {
    width: 300,
    height: 200,
  };
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}