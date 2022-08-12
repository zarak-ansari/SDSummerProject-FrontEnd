import React from "react"

export default function Header(props) {

    return (
        <>
            <form>
                <input type="text" placeholder='Name' />
                <input type="number" placeholder='Number Of Periods' min="1" max="120" />
                <button onClick={props.handleChange}>Update</button>
            </form>
            <h1>Hello</h1>
        </>
    )

}