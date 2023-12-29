"use client"
import styles from './quizRecap.module.scss';
import PageLayout from '@/src/layouts/page-layout/pageLayout';
import { RecapData } from '../../lib/types';
import Header from '@/src/components/ui/header/header';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const QuizRecapPage: React.FC = () => {

    const testData: RecapData[] = [
        {
            date: new Date(2023, 11, 19),
            numberOfTries: 0,
            operator: {
              Attack_Range: "TEST",
              Branch: "TEST",
              Class: "TEST",
              Faction:"TEST",
              Gender: "TEST",
              Id: "TEST",
              Name: "TEST",
              Rarity: 7,
              Position: "TEST",
              Race: "TEST"
            }
        },

        {
            date: new Date(2023, 11, 20),
            numberOfTries: 3,
            operator: {
              Attack_Range: "TEST",
              Branch: "TEST",
              Class: "TEST",
              Faction:"TEST",
              Gender: "TEST",
              Id: "TEST",
              Name: "TEST",
              Rarity: 7,
              Position: "TEST",
              Race: "TEST"
            }
        },

        {
            date: new Date(2023, 11, 23),
            numberOfTries: 4,
            operator: {
              Attack_Range: "TEST",
              Branch: "TEST",
              Class: "TEST",
              Faction:"TEST",
              Gender: "TEST",
              Id: "TEST",
              Name: "TEST",
              Rarity: 7,
              Position: "TEST",
              Race: "TEST"
            }
        },

        {
            date: new Date(2023, 11, 26),
            numberOfTries: 1,
            operator: {
              Attack_Range: "TEST",
              Branch: "TEST",
              Class: "TEST",
              Faction:"TEST",
              Gender: "TEST",
              Id: "TEST",
              Name: "TEST",
              Rarity: 7,
              Position: "TEST",
              Race: "TEST"
            }
        }
    ]

    return (
        <PageLayout>
            <h1>Not ready...</h1>
            <RecapSlot
                title='test'
                data={testData}
            />
        </PageLayout>
    )
}

export default QuizRecapPage;


// RecapSlot
interface IRecapSlot {
    title: string,
    data: RecapData[]
}

const RecapSlot: React.FC<IRecapSlot> = (props) => {
    const svgRef = useRef();

    const displayGraph = (aapl: RecapData[]) => {
        const width = 640;
        const height = 400;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 20;
        const marginLeft = 20;

        // Other
        const axisTickFormat = d3.format('.0f');
        const formatTime = d3.utcFormat("%d.%m");

        // Create date range
        const lastDate: Date = aapl[aapl.length - 1].date;
        const firstDate: Date = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() - 7)
        const yMaxValue = Math.max(...aapl.map(item => item.numberOfTries))
        

        // Declare the x (horizontal position) scale.
        const x = d3.scaleTime([firstDate, lastDate], [marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear([0, Math.trunc(yMaxValue)], [height - marginBottom, marginTop]);

        // Declare the line generator.
        const line = d3.line()
            .x(d => x((d as unknown as RecapData).date))
            .y(d => y((d as unknown as RecapData).numberOfTries));

        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        // Add the x-axis.
        svg.append("g")
            .attr("class", styles.axisTicsLabel)
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(d3.timeDay.every(1), formatTime).tickSizeOuter(0))

        // Add the y-axis, remove the domain line, add grid lines and a label.
        svg.append("g")
            .attr("class", styles.axisTicsLabel)
            .attr("transform", `translate(${marginLeft},0)`)
            // Horizontal axis
            .call(d3.axisLeft(y).tickFormat(axisTickFormat).ticks(height / (yMaxValue * 30)))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("color", "white")
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 1))
                .attr("stroke-width", 5)
            .call(g => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("Tries"));

        // Append a path for the line.
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 3)
            .attr("d", line(aapl as any));

        return svg.node();
    }

    useEffect(() => {
        if (svgRef.current !== undefined) {
            (svgRef.current as any).replaceWith(displayGraph(props.data));
        }
    }, [])

    return (
        <div className={styles.root}>
            <Header>{ props.title }</Header>
            <svg ref={svgRef}>

            </svg>
        </div>
    )
}