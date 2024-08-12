        // Data: gemiddelde neerslag per maand in mm
        const data = [
            { month: "Jan", rainfall: 59.9 },
            { month: "Feb", rainfall: 55.2 },
            { month: "Mrt", rainfall: 41.6 },
            { month: "Apr", rainfall: 32.2 },
            { month: "Mei", rainfall: 40.5 },
            { month: "Jun", rainfall: 47.2 },
            { month: "Jul", rainfall: 44.8 },
            { month: "Aug", rainfall: 55 },
            { month: "Sep", rainfall: 50.8 },
            { month: "Okt", rainfall: 62.9 },
            { month: "Nov", rainfall: 60 },
            { month: "Dec", rainfall: 59.9 }
        ];

        const width = 300;
        const height = 300;
        const margin = { top: 20, right: 30, bottom: 50, left: 70 };

        // Schaal voor de x-as (maanden)
        const x = d3.scaleBand()
            .domain(data.map(d => d.month))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        // Schaal voor de y-as (neerslag in mm)
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.rainfall)]).nice()
            .range([height - margin.bottom, margin.top]);

        // SVG selecteren
        const svg = d3.select("svg");

        // Tooltip
        const tooltip = d3.select(".tooltip");

        // Staven tekenen
        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.month))
            .attr("y", d => y(d.rainfall))
            .attr("height", d => y(0) - y(d.rainfall))
            .attr("width", x.bandwidth())
            .on("mouseover", (event, d) => {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`Neerslag: ${d.rainfall} mm`)
                    .style("left", `${event.pageX + 5}px`)
                    .style("top", `${event.pageY - 28}px`);
            })
            .on("mouseout", () => {
                tooltip.transition().duration(500).style("opacity", 0);
            });

        // x-as tekenen
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .attr("class", "axis-label")
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // y-as tekenen
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .attr("class", "axis-label");



        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", margin.left - 40)
            .attr("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .text("Neerslag (mm)");