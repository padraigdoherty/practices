/**
 * @see http://bl.ocks.org/nbremer/d2720fdaab1123df73f4806360a09c9e
 * @param {Object} d3
 */
window.ChordDiagramStep1 = window.ChordDiagramStep1 || (function (d3) {
        'use strict';

        var self = null,

            margin = {
                left : 90,
                top : 90,
                right : 90,
                bottom : 90
            },

            width = Math.min(window.innerWidth, 700) - margin.left - margin.right,
            height = Math.min(window.innerWidth, 700) - margin.top - margin.bottom,
            innerRadius = Math.min(width, height) * 0.39,
            outerRadius = innerRadius * 1.1,

            Names = ["Black Widow", "Captain America", "Hawkeye", "the Hulk", "Iron Man", "Thor"],
            colorSet = ["#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00"],
            opacityDefault = 0.8,

            matrix = [
                [0, 4, 3, 2, 5, 2], //Black Widow
                [4, 0, 3, 2, 4, 3], //Captain America
                [3, 3, 0, 2, 3, 3], //Hawkeye
                [2, 2, 2, 0, 3, 3], //The Hulk
                [5, 4, 3, 3, 0, 2], //Iron Man
                [2, 3, 3, 3, 2, 0] //Thor
            ],
            // Create scale and layout functions
            colors = d3.scale
                .ordinal()
                .domain(d3.range(Names.length))
                .range(colorSet),

            chord = d3.layout
                .chord()
                .padding(0.15)
                .sortChords(d3.descending)
                .matrix(matrix),

            arc = d3.svg
                .arc()
                .innerRadius(innerRadius * 1.01)
                .outerRadius(outerRadius),

            path = d3.svg
                .chord()
                .radius(innerRadius),
            //Create SVG
            svg = d3.select("#chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")"),

            outerArcs = null;

        return {
            /**
             * Returns an event handler for fading a given chord group.
             * @param {Object} opacity
             */
            fade: function (opacity) {
                return function(d, i) {
                    svg.selectAll("path.chord").filter(function(d) {
                        return d.source.index !== i && d.target.index !== i;
                    }).transition().style("opacity", opacity);
                };
            },

            run : function() {
                self = this;
                // Draw outer Arcs
                outerArcs = svg.selectAll("g.group")
                    .data(chord.groups)
                    .enter()
                    .append("g")
                    .attr("class", "group")
                    .on("mouseover", self.fade(0.1))
                    .on("mouseout", self.fade(opacityDefault));

                outerArcs.append("path")
                    .style("fill", function(d) {
                        return colors(d.index);
                    })
                    .attr("d", arc);
                //Append the label names on the outside
                outerArcs.append("text")
                    .each(function(d) {
                        d.angle = (d.startAngle + d.endAngle) / 2;
                    })
                    .attr("dy", ".35em")
                    .attr("class", "titles")
                    .attr("text-anchor", function(d) {
                        return ((d.angle > Math.PI) ? "end" : null);
                    }).attr("transform", function(d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" + "translate(" + (outerRadius + 10) + ")" + (d.angle > Math.PI ? "rotate(180)" : "");
                    }).text(function(d, i) {
                        return Names[i];
                    });
                //Draw inner chords
                svg.selectAll("path.chord")
                    .data(chord.chords)
                    .enter()
                    .append("path")
                    .attr("class", "chord")
                    .style("fill", function(d) {
                        return colors(d.source.index);
                    })
                    .style("opacity", opacityDefault)
                    .attr("d", path);
            }
        };

    }(d3));

window.document.addEventListener("DOMContentLoaded", function(event) {
    'use strict';
    var ChordDiagramStep1 = window.ChordDiagramStep1;

    ChordDiagramStep1.run();
});