import React from 'react';
import employee from '../images/employee.png'

class EmployeeNode extends React.Component {
    render() {
        return (
            <div>
                <img src={employee} alt="" />
            </div>
        );
    }

}
export default EmployeeNode;