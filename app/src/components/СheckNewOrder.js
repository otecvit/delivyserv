import React, { Component } from 'react'
import { connect } from 'react-redux';
import Sound from 'react-sound';
import { Layout, Tabs, Input, Icon, Table, Menu, Dropdown, Form, Select, message, Popconfirm, Modal } from 'antd';


class test extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playSound: false,
        }
      
    }

    componentDidMount() {
        const url = this.props.optionapp[0].serverUrl + "/SelectCountOrders.php";

        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.checkCountOrder(responseJson.orders_count);
            this.props.changeStatus({ statusCloud: 1});
        })
        .catch((error) => {
            this.props.changeStatus({ statusCloud: 0});
            console.error(error);
        });
        
    }

    checkCountOrder = (newCount) => {
        if (this.props.optionapp[0].allOrderCount !== Number(newCount)) {
            const allOrder = Number(newCount) - this.props.optionapp[0].allOrderCount + this.props.optionapp[0].newOrderCount;
            this.props.onControlOrder({
                allOrderCount: Number(newCount),
                newOrderCount: allOrder
            });
            this.setState ({playSound: true});
        }  
    }
    
    render() {

        return (
            <div>
                
               { this.state.playSound ? <Sound
                url="http://mircoffee.by/deliveryserv/app/sound/new_order.mp3"
                playStatus={Sound.status.PLAYING} 
                
                 /> : null
               }
            </div>
            );        
    }
}

export default connect (
    state => ({
        optionapp: state.optionapp,
    }),
    dispatch => ({
        onControlOrder: (data) => {
            dispatch({ type: 'EDIT_OPTIONAPP_CONTROL_ORDER', payload: data});
          },
        changeStatus: (data) => {
            dispatch({ type: 'CHANGE_OPTIONAPP_CLOUD_STATUS', payload: data});
          },
    })
  )(test);