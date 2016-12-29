let Board = React.createClass({
    getInitialState(){
        return {ary:[]}
    },
    handelClick(){
        var value = this.refs.myTxt.value;
        var newLis = this.state.ary.concat(value);
        this.setState({ary:newLis});
        this.refs.myTxt.value = '';
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.ary.map(function (item,index){
                                return <li key={index} className="list-group-item">{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input type="text" className="form-control" ref="myTxt"/>
                    <button className="btn btn-primary" onClick={this.handelClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));