import React from 'react';
import './Fractal-settings.css';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonClass: 'properties',
            headerTitle: this.props.title,
            list1Open: false,
            list2Open: false,
            wrapper1Value: 100,
            wrapper2Value: 100,
            dropDown1Title: 'Select Fractal',
            dropDown2Title: 'Select Figure',
            fractalType: [
                {
                    id: 0,
                    title: 'Koch',
                    selected: false,
                    key: 'fType'
                },
                {
                    id: 1,
                    title: 'Serpinskii',
                    selected: false,
                    key: 'fType'
                }
            ],
            figure: [
                {
                    id: 0,
                    title: 'Triangle',
                    selected: false,
                    key: 'figureType'
                },
                {
                    id: 1,
                    title: 'Rectangle',
                    selected: false,
                    key: 'figureType'
                }
            ],
            coefA: 1,
            coefB: 1
        };
    };

    menuOperator() {
        if (this.state.buttonClass === 'properties') {
            this.setState({ buttonClass: 'properties closed' });
        }
        else {
            this.setState({ buttonClass: 'properties' });
        }
    }

    toggleList1() {
        this.setState(prevState => ({
            list1Open: !prevState.list1Open
        }));
        this.state.wrapper1Value === 100 ? this.setState({ wrapper1Value: 13 }) : this.setState({ wrapper1Value: 100 });
    }

    toggleList2() {
        this.setState(prevState => ({
            list2Open: !prevState.list2Open
        }));
        this.state.wrapper2Value === 100 ? this.setState({ wrapper2Value: 13 }) : this.setState({ wrapper2Value: 100 });
    }

    setList1(item) {
        this.setState({ dropDown1Title: item.title });
        this.toggleList1();
        this.state.fractalType.forEach((element) => { element !== item ? element.selected = false : element.selected = true });
        item.selected = true;
    }

    setList2(item) {
        this.setState({ dropDown2Title: item.title });
        this.toggleList2();
        this.state.figure.forEach((element) => { element !== item ? element.selected = false : element.selected = true });
        item.selected = true;
    }

    build(type) {
        console.log(this.state.figure);
        var len = 10;
        var count;
        this.state.figure.forEach((element) => { element.selected === true ? count = element.title : console.log() });
        count === 'Triangle' ? count = 3 : count = 4;
        if(type === 'k'){
            var coef = this.state.coefA / this.state.coefB;
            this.props.handler(len, count, coef, 'Koch');
        }
        else{
            var iter = this.state.serpIterations;
            this.props.handler(len, count, iter, 'Serpinskii');
        }
    }

    render() {
        const { list1Open, list2Open } = this.state

        return (
            <div className={this.state.buttonClass}>
                <button className='settings-invoker' onClick={(e) => { this.menuOperator() }}>
                    <input type="checkbox" className="checker" />
                    <i className="fas fa-chevron-left fa-2x"></i>
                </button>
                <div className="dd-wrapper" style={{ marginBottom: this.state.wrapper1Value + 'px' }}>
                    <div className="dd-header" onClick={() => { this.toggleList1(); }}>
                        <div className="dd-header-title">{this.state.dropDown1Title}</div>
                        {list1Open
                            ? <i className="fas fa-chevron-up" />
                            : <i className="fas fa-chevron-down" />
                        }
                    </div>
                    {list1Open && <ul className="dd-list">
                        {this.state.fractalType.map((item) => (
                            <li className="dd-list-item" key={item.id} onClick={() => { this.setList1(item) }}>{item.title}</li>
                        ))}
                    </ul>}
                </div>
                <div className="dd-wrapper" style={{ marginBottom: this.state.wrapper2Value + 'px' }}>
                    <div className="dd-header" onClick={() => { this.toggleList2() }}>
                        <div className="dd-header-title">{this.state.dropDown2Title}</div>
                        {list2Open
                            ? <i className="fas fa-chevron-up" />
                            : <i className="fas fa-chevron-down" />
                        }
                    </div>
                    {list2Open && <ul className="dd-list">
                        {this.state.figure.map((item) => (
                            <li className="dd-list-item" key={item.id} onClick={() => { this.setList2(item) }}>{item.title}</li>
                        ))}
                    </ul>}
                </div>
                {this.state.fractalType[0].selected
                    ? <div>
                        <p className="textBox">Enter coeficient:</p>
                        <input type="text" min='0' className="kochFractalInput" onChange={e => this.setState({coefA: e.target.value})}/>
                        <input type="text" min='0' className="kochFractalInput" onChange={e => this.setState({coefB: e.target.value})}/>
                        <button className='buildBtn' onClick={() => { this.build('k'); console.log('success'); }}>Build</button>
                    </div>
                    : this.state.fractalType[1].selected
                        ? <div><p className="textBox">Enter iterations</p><input type="text" min='0' className="serpinskiiFractalInput" onChange={e => this.setState({serpIterations: e.target.value})}/>
                            <button className='buildBtn' onClick={() => { this.build('s'); }}>Build</button>
                        </div>
                        : null
                }
            </div>
        )
    }
}
export { Settings as default };