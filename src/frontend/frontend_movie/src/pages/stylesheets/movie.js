/*
    Stylesheet for the movie.js file.
*/

import styled from "styled-components";

export const Box = styled.nav`
    background: black;
`;

// CSS for the container.
export const Container = styled.nav`
    background: grey;
    opacity: 0.5;
    border-radius: 25px;
    height: 100vh;
`; 


// CSS for text.
export const Text = styled.h1`
    font-size: 1.5em;
    text-align: left;
    color: white;
    margin: 0.25em 1em;
    padding-top: 4em;
    padding-left: 4em;
`;

// CSS for the tile.
export const Tile = styled.nav`
    background: white;
    border-radius: 10px;
    height: 50vh;
    width: 18vw;
    &:hover {
        background:palevioletred;
    }
`;