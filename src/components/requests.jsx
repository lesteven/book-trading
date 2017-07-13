import React,{Component} from 'react';
import { connect } from 'react-redux';
import {postInfo,getInfo} from '../redux/modules/infoModule';


class Requests extends Component{
	constructor(props){
		super(props);
		this.state={
			items:'',
			status:''
		}
		this.reqList = this.oReqList.bind(this);
		this.showList = this.showList.bind(this);
	}
	showList(props,status){
		this.setState({
			items:props,
			status: status
		})
	}
	yourRequest(){
		return(
			<button  className='buttons yrequest'
			onClick={()=>this.showList(this.props.info.yrequest,'yrequest')}>
				Your Requests ({this.props.info.yrequest?
					this.props.info.yrequest.length:0})
			</button>
		)
	}
	othersRequest(){
		return(
			<button className='buttons orequest'
			onClick={()=>this.showList(this.props.info.orequest,'orequest')}>
				Others' Requests ({this.props.info.orequest?
					this.props.info.orequest.length:0})
			</button>
		)
	}
	approved(){
		return(
			<button className='buttons approved'
			onClick={()=>this.showList(this.props.info.accepted,'accepted')}>
				Approved ({this.props.info.accepted?
					this.props.info.accepted.length:0})
			</button>
		)
	}
	oReqList(){
		let list;
		list = this.state.items.map((req,key)=>{
			let data ={
				id: req._id,
				user: req.user,
				title: req.title
			}
			return(
				<div key={key} className='boxChild2'>
					<p>{req.title}</p>
					{this.state.status==='orequest'?
					<span>
						<button className='buttons decline'
						onClick={()=>this.props.postInfo('/requests/decline',
							'POST',data,this.props.getInfo)}>
							Decline
						</button>
						<button className='buttons approved'
						onClick={()=>this.props.postInfo('/requests/approve',
							'POST',data,this.props.getInfo)}>
							Approve
						</button>
					</span>:null}
				</div>
			)
		})
		return list;
	}
	componentWillReceiveProps(props){
		this.setState({items:props.info[this.state.status]})
	}
	render(){
		return(
			<div>
				{this.yourRequest()}
				{this.othersRequest()}
				{this.approved()}
				<div className='flexBox'>
					{this.state.items?this.oReqList():null}
				</div>
				<hr/>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		info:state.info
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		postInfo:(url,method,data,actFunc)=>
				dispatch(postInfo(url,method,data,actFunc)),
		getInfo:(info)=>dispatch(getInfo(info))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Requests)