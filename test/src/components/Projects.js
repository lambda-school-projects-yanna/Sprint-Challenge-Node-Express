import React from 'react';
import axios from 'axios';

class Projects extends React.Component {
    state = {
        projects: null
    }



    componentDidMount() {
        axios
            .get('http://localhost:4000/api/projects/')
            .then((res) => {
                this.setState({projects: res.data})
                console.log(this.state.projects);
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <h2>Projects</h2>
                { this.state.projects && this.state.projects.map(project => {
                    return (
                        <div>
                           <h3>{project.name}</h3> 
                           <p>{project.description}</p> 
                        </div>
                    );
                })}
            </div>
        );
    }


}

export default Projects;