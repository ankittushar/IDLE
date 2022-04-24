import React from 'react';
import './question.css'

function Question(props) {
    return (
        <div className='question-box'>
            <h1>Some type of Problem</h1>
            <br/>
            <p>There's a staircase with N steps, and you can climb 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.
                <br/><br/>
                For example, if N is 4, then there are 5 unique ways:
                <br/><br/>
                1, 1, 1, 1
                2, 1, 1
                1, 2, 1
                1, 1, 2
                2, 2
                <br/><br/>
                What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = [1, 3, 5], you could climb 1, 3, or 5 steps at a time. Generalize your function to take in X.
                <br/><br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nisi, quam iure saepe, cumque cupiditate nemo nulla autem illum qui dolorum vero, corrupti voluptates. Inventore a placeat id repellendus laborum?
            </p>
    
        </div>
    );
}

export default Question;