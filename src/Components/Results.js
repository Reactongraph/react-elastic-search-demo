import React, { Component } from 'react';

const Results = props => (
    <div>
        <h2>{props.response.info.meta.page.total_results} Results</h2>
        {props.response.results && props.response.results.map(result => (
            <div key={result.getRaw("id")} className="paddng_btm">
                <p>Id: {result.getRaw("id")}</p>
                <p>Owner: {result.getRaw("owners")}</p>
                <p>Name: {result.getRaw("name")}</p>
                <p>Description: {result.getRaw("description")}</p>
            </div>
        ))}
    </div>)

export default Results;