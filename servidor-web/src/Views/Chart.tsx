import { Component } from 'react'

import { ResponsiveLine } from "@nivo/line"

import './Chart.css'

type chartDatapoint = {
  x: string,
  y: number
}

type ChartProps = {
  attribute: {
    _id: string,
    name: string,
    unit: string
  },
  data: chartDatapoint[]
}

class Chart extends Component<ChartProps> {
  render() {
    return (
      <div className="chart">
        <ResponsiveLine
          data={[{
            "id": this.props.attribute.name,
            "data": this.props.data
          }]}
          margin={{ top: 10, right: 150, bottom: 110, left: 60 }}
          xScale={{ format: "%Y-%m-%dT%H:%M:%S.%LZ", type: 'time' }}
          yScale={{ type: 'linear' }}
          xFormat="time:%d/%m/%Y %H:%M:%S.%L"
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 20,
              format: "%d/%m/%Y %H:%M",
              legend: "Data",
              legendOffset: 60,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: this.props.attribute.unit,
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          enableGridX={false}
          colors={{ scheme: 'spectral' }}
          lineWidth={1}
          pointSize={4}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[{
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .7)',
            effects: [{
              on: 'hover',
              style: {
                  itemBackground: 'rgba(0, 0, 0, .7)',
                  itemOpacity: 1
              }
            }]
          }]}
        />
      </div>
    )
  }
}

export default Chart