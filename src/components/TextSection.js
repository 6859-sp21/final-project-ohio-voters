import React from "react";

// Welcome! This visualization tool shows an in-depth look into the voting trends of Asian American and Pacific Islanders (AAPIs) who live in the state of Ohio. On this page, you can explore a few of the trends we found interesting in the data. Please feel free to also head to the 'Map' page where you can explore detailed voter data on your own as well! Finally, in the 'About' tab, you can learn more about the design process and decisions we made in creating this visualization tool!

const text_bank = [
  "Within this set of visualizations, you can investigate trends that we found to be significant. In the figure to the right, investigate how AAPI voters in the state of Ohio lean along the political spectrum. Each of the circles represent areas of a Democratic majority, and each of the circles in the red represent areas in a Republican majority. Currently you see the Ohio House Districts, but if you click on the dropdown menu you can also select from cities, US House Districts, and Ohio Senate districts- all districts where competitive elections occur. This is extremely useful in understanding at a quick glance where political campaigns may want invest resources- for example, a Republican candidate likely should not attempt to campaign in Ohio House District 9, as this is a strongly Democratic area. In this visualization, average party leaning was derived from official party affiliation from voter registration data.\n\n Scroll further to investigate the data more!",
  "An interesting trend to see is how voter turnout correlates with political party skew. Use the dropdowns to toggle between localities and election types, to see the correlation between party skew and voter engagement. Average Voter Engagement Score (or AVES) was calculated by taking the number elections each individual voted in for the given election type since 2000, dividing by the total number of elections that individual was eligible to vote in since 2000, and averaging over all individuals in the given locality. Seen in nearly all of the districts visualized here, a strong correlation exsits between voters who affiliate with the Republican party and increased turnout, as well as the opposite voter engagement trend for the Democratic party. The consistency of this trend accross the locatlity types reinforces the prominence of this pattern.",
  "In this visualization you can see the distribution of ages accross the different Ohio localizations. A clear correlation can be seen between age, partisan skew, and voter engagement. Specifically, older voters are more Republican-leaning, while younger voters are more Democratic-leaning. That being said, while this correlation is certainly clear at the age extremes, partisan skew fluctuates quite significantly throughout the localities with moderately aged AAPI voters. This trend, in combination with what was seen in the previous visualization above, confirms what is seen on the bottom-most bar chart, where a strong positive correlation (accross locality types) is seen between age and voter engagement.",
]

export default function TextSection(props) {
    const text = props.textId;

    return (
        <div
            id="container"
            style={{height: "100vh", verticalAlign: "middle", position: "relative"}}
        >
            <div
                style={{margin: 0, position: "absolute", top: "50%", transform: "translateY(-50%)"}}
            >
                {text_bank[text]}
            </div>
        </div>

    );


}
