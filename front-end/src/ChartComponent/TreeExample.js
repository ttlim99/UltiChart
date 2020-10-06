import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import ManagerNode from './ManagerNode'
import EmployeeNode from './EmployeeNode'

class TreeExample extends React.Component {
    render() {
        return (
            <div>
                <Tree 
                    lineWidth = {'2px'}
                    lineColor = {'green'}
                    lineBorderRadius = {'10px'}
                    label = {<ManagerNode/>}
                    nodePadding = {'80px'}
                >
                    <TreeNode label = {<EmployeeNode/>}>
                        <TreeNode label = {<EmployeeNode/>}></TreeNode>
                    </TreeNode>
                    <TreeNode label = {<EmployeeNode/>}>
                        <TreeNode label = {<EmployeeNode/>}></TreeNode>
                    </TreeNode>
                    <TreeNode label = {<EmployeeNode/>}>
                        <TreeNode label = {<EmployeeNode/>}></TreeNode>
                    </TreeNode>
                </Tree>
            </div>
        );
    }

}
export default TreeExample;