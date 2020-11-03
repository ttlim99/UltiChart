import React, { Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function getTR(
    item,
    allitems,
    addNew,
    deleteNode,
    editNode,
    addSpace,
    animation,
    editingNodeId,
    changeEditingNodeId,
    editable,
    rootEditable,
    nodeStyle,
    nodeClassName,
    btnsStyle,
    btnsClassName,
    lineColor
) {
    const children = allitems[item.employeeId];
    const colspan = (children ? children.length : 1) * 2;

    const lines = _.map(_.range(0, colspan), (l, idx) => {
        if (idx === 0) {
            return <td key={idx} className="right-line" style={{borderColor: lineColor}} />

        } else if (idx + 1 === colspan) {
            return <td key={idx} className="left-line" style={{borderColor: lineColor}} />

        } else if (idx % 2 === 0) {
            return <td key={idx} className="right-line top-line" style={{borderColor: lineColor}} />

        } else {
            return <td key={idx} className="left-line top-line" style={{borderColor: lineColor}} />
        }
    })

    return(
        <table className={addSpace ? 'add-space' : ''}>
            <tbody>
                <tr className="node">
                    <td colSpan={colspan}>
                        <NodeBox 
                            node={item} 
                            addNew={addNew}
                            deleteNode={deleteNode}
                            editNode={editNode}
                            animation={animation}
                            editingNodeId={editingNodeId}
                            changeEditingNodeId={changeEditingNodeId}
                            editable={editable}
                            rootEditable={rootEditable}
                            nodeStyle={nodeStyle}
                            nodeClassName={nodeClassName}
                            btnsStyle={btnsStyle}
                            btnsClassName={btnsClassName}
                        />
                    </td>
                </tr>
                {children &&
                    <tr className="lines">
                        <td colSpan={colspan}>
                            <div className="down-line" style={{borderColor: lineColor}} />
                        </td>
                    </tr>
                }

                {children && children.length > 1 &&
                    <tr className="lines">
                        {lines}
                    </tr>
                }

                {children && children.length === 1 &&
                    <tr className="lines">
                        <td colSpan={colspan}>
                            <div className="down-line" style={{borderColor: lineColor}} />
                        </td>
                    </tr>
                }
              
                <tr className="nodes">
                    {
                    _.map(children, i => {
                        return (
                            <td
                                key={i.employeeId}
                                colSpan={2}
                            >
                                {getTR(
                                    i,
                                    allitems,
                                    addNew,
                                    deleteNode,
                                    editNode,
                                    children.length > 1,
                                    false,
                                    editingNodeId,
                                    changeEditingNodeId,
                                    editable,
                                    rootEditable,
                                    nodeStyle,
                                    nodeClassName,
                                    btnsStyle,
                                    btnsClassName,
                                    lineColor
                                )}
                            </td> 
                        );
                    })
                    }
                </tr>
            </tbody>
        </table>
    );
}

class OrgChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingNodeId: -1
        }
    }

    changeEditingNodeId = (editingNodeId) => {
        if (editingNodeId !== this.state.editingNodeId) {
            this.setState({editingNodeId: editingNodeId});
        }
    }

    render() {
        const groupedData = _.groupBy(this.props.data, 'managerId');
        const animate = this.props.animation && this.props.data.length <= 1;

        const tables = _.map( groupedData[null], item => {
            return (
                <div
                    className="root-container"
                    key={item.employeeId}
                >
                    {getTR(
                        item,
                        groupedData,
                        this.props.addNewChild,
                        this.props.deleteNode,
                        this.props.editNode, 
                        true,
                        animate,
                        this.state.editingNodeId,
                        this.changeEditingNodeId,
                        this.props.editable,
                        this.props.rootEditable,
                        this.props.nodeStyle,
                        this.props.nodeClassName,
                        this.props.btnsStyle,
                        this.props.btnsClassName,
                        this.props.lineColor
                    )}
                </div>
            );
        });

        return (
            <div className="org-chart-container">
                {tables}
            </div>
        );
    }
}

OrgChart.propTypes = {
    data: PropTypes.array.isRequired,
    addNewChild: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    editNode: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired
};

class NodeBox extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            node: props.node,
            editMode: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.node !== this.state.node) {
            this.setState({node: nextProps.node});
        }
        if (nextProps.editingNodeId !== this.state.node.employeeId){
            this.setState({editMode: false});
        }
    }

    addNewChild = () => {
        this.props.addNew(this.state.node.employeeId);
    }

    deleteNode = () => {
        this.props.deleteNode(this.state.node);
    }

    editNode = () => {
        this.setState({editMode: true});
        this.props.changeEditingNodeId(this.state.node.employeeId);
    }

    showNode = () =>{
        alert(this.state.node.lastName);
    }

    handleChangeFN = (e) => {
        let node = _.cloneDeep(this.state.node);
        node.firstName = e.target.value;
        this.setState({node: node});
    }
    handleChangeLN = (e) => {
        let node = _.cloneDeep(this.state.node);
        node.lastName = e.target.value;
        this.setState({node: node});
    }

    handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            this.done(e);
        }
    }

    done = () => {
        this.props.editNode(this.state.node);
        this.setState({editMode: false});
    }

    cancel = () => {
        this.setState({node: this.props.node, editMode: false});
    }

    render() {
        const {
            node,
            editMode
        } = this.state;

        const {
            editingNodeId,
            changeEditingNodeId,
            editable,
            rootEditable,
            nodeStyle,
            nodeClassName,
            btnsStyle,
            btnsClassName
        } = this.props;

        return(
                <ClickOutsideHandler action={editingNodeId !== -1 && editingNodeId === node.employeeId ? changeEditingNodeId : null}>
                {
                    editMode && editable ?
                    <div className={`node-box ${nodeClassName}`} style={nodeStyle} >
                        <div className={`org-node-btns ${btnsClassName}`} style={btnsStyle}>

                        </div>
                        <textarea 
                            rows="3"
                            cols="10"
                            autoFocus
                            value={node.firstName} 
                            onChange={this.handleChangeFN}
                            onKeyPress={this.handleEnterKey}
                            onBlur={this.onBlur}
                        />
                        <textarea 
                            rows="3"
                            cols="10"
                            autoFocus
                            value={node.lastName} 
                            onChange={this.handleChangeLN}
                            onKeyPress={this.handleEnterKey}
                            onBlur={this.onBlur}
                        />
                    </div>
                    :
                    <div className={`node-box ${this.props.animation ? 'node-animation' : ''} ${nodeClassName}`} style={nodeStyle} >
                        { editable &&
                            <div className={`org-node-btns ${btnsClassName}`} style={btnsStyle}>
                                {(node.managerId !== null || (node.managerId === null && rootEditable))


                                }
                                {node.managerId !== null 
                                }
                            </div>
                        }
                        <div onClick={(node.managerId !== null || (node.managerId === null && rootEditable)) && editable ? this.editNode : undefined} className="node-name-box">
                            <p className="node-name">{_.truncate(node.firstName,{length: 35, omission: ' ...'})+" "+_.truncate(node.lastName,{length: 35, omission: ' ...'})}</p>                        
                        </div>
                    </div>
                }
                </ClickOutsideHandler>
        );
    }
}

NodeBox.propTypes = {
    node: PropTypes.object.isRequired,
    addNew: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    editNode: PropTypes.func.isRequired,
    editingNodeId: PropTypes.number.isRequired,
    changeEditingNodeId: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired
}

class ClickOutsideHandler extends Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);           
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.action) {
            this.props.action(-1);
        }
    }

    render() {
        return (
            <div ref={this.setWrapperRef} className="inline-block">
                {this.props.children}
            </div>
        );
    }
}

ClickOutsideHandler.propTypes = {
    children: PropTypes.element.isRequired,
    action: PropTypes.func
}

export default OrgChart;