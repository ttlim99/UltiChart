import _ from 'lodash';
import React from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import OrgChart from './Orgchart.js';

class Chart extends React.Component {
    static defaultProps = {
        readonly: false,
        disableRootEdit: false,
        data: [{
            employeeId : 1, 
            firstName: 'FirstName', 
            managerId: null,
            lastName: 'LastName'
            }],
        addNewChild: undefined,
        deleteNode: undefined,
        editNode: undefined,
        animation: true,
        nodeStyle: null,
        nodeClassName: '',
        btnsStyle: null,
        btnsClassName: '',
        lineColor: ''
    }

    constructor(props) {
        super(props);
        const data = props.data;
        this.state = {
            data: data
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    add = (managerId) => {
        const newId = _.maxBy(this.state.data, 'employeeId').employeeId + 1;

        const newNode = {
            employeeId: newId,
            firstName: 'FirstName',
            lastName: 'LastName',
            managerId: managerId,
        };
        this.setState({ data: [...this.state.data, newNode] });
    }

    delete = (node) => {
        const newData = this.deleteChildren(node, _.cloneDeep(this.state.data), node.employeeId);
        _.remove(newData, {employeeId: node.employeeId});

        this.setState({ data: newData });
    }

    deleteChildren(n, data, stopNode) {
        const child = _.find(data, {managerId: n.employeeId});
        const parent = _.find(data, {employeeId: n.managerId});

        if(child) {
           return this.deleteChildren(child, data, stopNode);

        } else if(stopNode === n.employeeId) {
            return data;

        } else {
            _.remove(data, {employeeId: n.employeeId});
           return this.deleteChildren(parent, data, stopNode);
        }
    }  

    edit = (node) => {
        const editIdx = _.findIndex(this.state.data, {employeeId: node.employeeId});
        let updated = update(this.state, {data: {[editIdx]: {$set: node}}} );
        this.setState(updated);
    }

    // exportData = () => {
    //     return this.state.data;
    // }

    render() {
        const {
            readonly,
            disableRootEdit,
            addNewChild,
            deleteNode,
            editNode,
            animation,
            nodeStyle,
            nodeClassName,
            btnsStyle,
            btnsClassName,
            lineColor
        } = this.props;

        const { data } = this.state;

        return (
            <OrgChart
                editable={!readonly}
                rootEditable={!disableRootEdit}
                data={data}
                addNewChild={addNewChild ? addNewChild : this.add}
                deleteNode={deleteNode ? deleteNode : this.delete}
                editNode={editNode ? editNode : this.edit}
                animation={animation}
                nodeStyle={nodeStyle}
                nodeClassName={nodeClassName}
                btnsStyle={btnsStyle}
                btnsClassName={btnsClassName}
                lineColor={lineColor}
            >
            </OrgChart>
        );
    }
}
Chart.propTypes = {
    readonly: PropTypes.bool,
    disableRootEdit: PropTypes.bool,
    data: PropTypes.array,
    addNewChild: PropTypes.func,
    deleteNode: PropTypes.func,
    editNode: PropTypes.func,
    animation: PropTypes.bool,
    nodeStyle: PropTypes.object,
    nodeClassName: PropTypes.string,
    btnsStyle: PropTypes.object,
    btnsClassName: PropTypes.string,
    lineColor: PropTypes.string
}
export default Chart;
//Kborg
