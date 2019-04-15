import React from 'react';
import {Panel, Button, Form, FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem, Checkbox } from 'react-bootstrap';

function getDropDownOptions(data) {
  let items = [];
  if (data) {
    for (let i = 0; i <= data.length; i++) {
        items.push(<MenuItem title={data[i]}>{data[i]}</MenuItem>)
    }
  }
  return items;
}

function getReleaseProfileDropDownOptions(data) {
  let items = [];
  items.push(<MenuItem title='None'>None</MenuItem>)
  Object.keys(data).forEach(function(key){
    var value = data[key];
    if (data) {
      items.push(<ControlLabel className="box-label" bsSize="large" >==================={key}=====================</ControlLabel>);
      for (let i = 0; i <= value.length; i++) {
          items.push(<MenuItem title={value[i]}>{value[i]}</MenuItem>)
      }
    }
  });
  return items;
}

class ERNForm extends React.Component{

  constructor() {
    super();
    this.schemaList = ['ERN', 'RIN'];
    this.messageSchemaVersionIdList = ['3.4.1', '3.7.1', '3.8.2', '4.1'];
    this.releaseProfileVersionIdList = {'v1.3':[ 'AudioAlbum', 'AudioAlbumMusicOnly', 'AudioAlbumMusicAndSpeech', 'AudioSingle', 'AudioBook', 'DigitalBoxedSet',
         'DigitalClassicalAudioAlbum', 'FilmBundle', 'LongformVideo', 'MidiRingtone', 'MixedMediaBundle', 'ReleaseProfileDeletedRules', 'Ringtone', 'SimpleVideoSingle',
         'SingleResourceRelease','SingleResourceReleaseWithCoverArt', 'TVSeries', 'VideoAlbum', 'VideoSingle', 'Wallpaper' ],
        'v1.4':[ 'AudioAlbum', 'AudioAlbumMusicOnly', 'AudioSingle', 'AudioBook', 'DigitalBoxedSet', 'DigitalClassicalAudioAlbum', 'FilmBundle', 'LongformVideo',
          'MidiRingtone', 'MixedMediaBundle', 'Ringtone', 'SimpleVideoSingle', 'SingleResourceRelease','SingleResourceReleaseWithCoverArt', 'TVSeries', 'VideoAlbum',
          'VideoSingle', 'Wallpaper' ],
        'v2.1':[ 'Audio', 'BoxedSetVariant', 'ClassicalVariant', 'DjMix', 'LongFormMusicalWorkVideo', 'MixedMedia', 'ReleaseProfileTrackReleaseRules', 'Ringtone',
          'SimpleAudioSingle', 'SimpleVideoSingle', 'Video']}
  }

  render(){
    return(
      <Panel header="Insert Document">
        <Form inline id="ern-validate-form" onSubmit={this.props.handleSubmit}>
          <FormGroup onClick={this.props.handleSchemaChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.schema} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.schemaList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          <FormGroup onClick={this.props.handleMessageSchemaVersionIdChange}>
            <ButtonToolbar>
              <DropdownButton title={this.props.messageSchemaVersionId} bsSize="small" id="dropdown-size-small">
                {getDropDownOptions(this.messageSchemaVersionIdList)}
              </DropdownButton>
            </ButtonToolbar>
          </FormGroup>
          { this.props.messageSchemaVersionId != '3.4.1' &&
            <FormGroup onClick={this.props.handleReleaseProfileVersionIdChange}>
              <ButtonToolbar className="custom-button">
                <DropdownButton title={this.props.releaseProfileVersionId} id="dropdown-size-small" bsSize="small">
                  {getReleaseProfileDropDownOptions(this.releaseProfileVersionIdList)}
                </DropdownButton>
              </ButtonToolbar>
            </FormGroup>
          }
          &nbsp;
          { (this.props.messageSchemaVersionId == '3.8.2' || this.props.messageSchemaVersionId == '3.7.1') &&
            <FormGroup>
              <ButtonToolbar>
                <Checkbox className="checkbox" name="status" onChange={this.props.onStatusChange} />
                <ControlLabel className="box-label">Is Business Profile validation required?</ControlLabel>
              </ButtonToolbar>
            </FormGroup>
          }
          <br/>
          <FormGroup>
            <ControlLabel></ControlLabel>
              {' '}
              <input type="file" name="messageFile" value={this.props.messageFile} onChange={this.props.handleMessageFileChange} />
          </FormGroup>
            {' '}
          <br/>
          <br/>
          <Button bsStyle="primary" type="submit">Validate</Button>
        </Form>
      </Panel>
    );
  }
}

export default ERNForm;
