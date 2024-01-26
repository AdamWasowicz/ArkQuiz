"use client"
import styles from './recapSlot.module.scss';
import { RecapData } from '../../lib/types';
import * as d3 from 'd3';
import { LegacyRef, useEffect, useRef } from 'react';
import Paragraph from '@/src/components/ui/paragraph/paragraph';
import SubHeader from '@/src/components/ui/sub-header/subHeader';

interface IRecapSlot {
    title: string,
    data: RecapData[]
}

export const RecapSlot: React.FC<IRecapSlot> = (props) => {
    const svgRef = useRef<SVGSVGElement>();

    const getPreviousDate = (date: Date, daysBack: number): Date => {
        const dateCopy = new Date(date);
        dateCopy.setDate(dateCopy.getDate() - daysBack);
        return dateCopy;
    }

    const displayGraph = (aapl: RecapData[]): SVGSVGElement => {
        const width = 1400;
        const height = 500;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 20;
        const marginLeft = 20;

        // Other
        const axisTickFormat = d3.format('.0f');
        const formatTime = d3.utcFormat("%d.%m");
        const svgBackgroundColor = "--gray-700";
        const borderColor = "--gray-400"
        const dotColor = "var(--primary-400)";
        const lineColor = "white";

        // Create date range
        const lastDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        const firstDate: Date = getPreviousDate(lastDate, 13);
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
            .attr("style", `width: auto; height: auto; height: intrinsic; background-color: var(${svgBackgroundColor}); border: 2px solid var(${borderColor}); padding: 10px; margin-left: auto;
            margin-right: auto;`);

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
            .call(d3.axisLeft(y).ticks(Math.min(yMaxValue, 10)).tickFormat(axisTickFormat))
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
                .text("Guesses"));

        // Append a path for the line.
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", lineColor)
            .attr("stroke-width", 3)
            .attr("d", line(aapl as never));

        svg.append("g")
            .selectAll("dot")
            .data(aapl)
            .enter()
            .append("circle")
              .attr("cx", function(d) { return x(d.date) } )
              .attr("cy", function(d) { return y(d.numberOfTries) } )
              .attr("r", 5)
              .attr("fill", dotColor)

        return svg.node()!;
    }


    useEffect(() => {
        if (props.data.length > 0 && svgRef.current !== undefined) {
            (svgRef.current).replaceWith(displayGraph(props.data));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.root}>
            <SubHeader>{ props.title + " Quiz Recap"}</SubHeader>
            {
                props.data.length > 0 
                ? <div className={styles.svgContainer}>
                    <svg className={styles.svg} ref={svgRef as LegacyRef<SVGSVGElement>}></svg>
                </div>
                : <Paragraph className={styles.noData}>No data yet</Paragraph>
            }
        </div>
    )
}

export default RecapSlot;