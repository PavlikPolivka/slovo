import { useState, useEffect, componentDidMount } from "react";


export default function Reset() {

    useEffect(() => {
        localStorage.setItem('data', "{}");
    });

    return (
        <p>Reset.</p>
    );
}