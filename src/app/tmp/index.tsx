import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ITmpDto } from '../../shared/types/tmp_dto';
import { IRootState } from '../../store/state';
import { tmpActions } from './actions';

interface ITmpProps {
  dataDto: ITmpDto;
  actions: any;
}

class Tmp extends React.Component<ITmpProps> {
  public constructor(props: ITmpProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.actions.loadData();
  }

  public render() {
    const dto = this.props.dataDto;

    return (
      <div className='App'>
        <h1>{dto.title}</h1>
        <h2>{dto.subTile}</h2>
        <button onClick={this.props.actions.loadData}>Load</button>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  dataDto: state.tmp.dataDto,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(tmpActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tmp);
