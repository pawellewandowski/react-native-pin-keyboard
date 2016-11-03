import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pad: {
        flex: 1,
        margin: 20,
        height:520,
    },
    btn: {

        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 10,
        borderWidth: 3,
        borderColor: '#ddd',
        borderRadius: 500
    },
    btnText: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        paddingBottom: 20,
        fontSize: 40,
    },
    header: {
        fontSize: 30,
        fontWeight: '500',
    },
    pin: {
        fontSize: 40,
        fontWeight: '500',
    },

});

const MAX_LENGTH = 4;

function makeDots(num) {
    let ret = '';
    while (num > 0) {
        ret += ' ○ ';
        num--;
    }
    return ret;
}

export default class Pin extends Component {
    state = {value: ''};

    handleClear() {
        this.setState({value: ''});
    }

    handlePress(num) {
        let {value} = this.state;
        value += String(num);

        this.setState({value});

        if (value.length == MAX_LENGTH) {
            this.props.onSubmit(value);
        }
    }

    handleRemove() {
        const {value} = this.state;
        this.setState({value: value.substr(0, value.length - 1)});
    }

    renderButton(num) {
        return (<View style={styles.btn}>
            <TouchableOpacity onPress={()=> this.handlePress(num)}>
                <Text style={styles.btnText}>{num}
                </Text>
            </TouchableOpacity>
        </View>);
    }

    render() {
        const {value} = this.state;
        const marks = value.replace(/./g, ' ● ');
        const dots = makeDots(MAX_LENGTH - value.length);

        return (<View style={styles.pad}>
            <Text style={styles.header}>
                Enter pin:
            </Text>

            <View style={styles.row}>
                <Text style={styles.pin}>{marks}{dots}</Text>
            </View>

            <View style={styles.row}>
                {this.renderButton(1)}
                {this.renderButton(2)}
                {this.renderButton(3)}
            </View>

            <View style={styles.row}>
                {this.renderButton(4)}
                {this.renderButton(5)}
                {this.renderButton(6)}
            </View>

            <View style={styles.row}>
                {this.renderButton(7)}
                {this.renderButton(8)}
                {this.renderButton(9)}
            </View>

            <View style={styles.row}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={()=> this.handleClear()}>
                        <Text style={styles.btnText}>C
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderButton(0)}
                <View style={styles.btn}>
                    <TouchableOpacity onPress={()=> this.handleRemove()}>
                        <Text style={styles.btnText}>{'<'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>);
    }
}
