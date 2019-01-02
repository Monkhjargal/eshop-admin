import React from 'react';
import SelectWidget from '../SelectWidget';

class ExtraSelectWidget extends SelectWidget {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {super.render()}
        <span>blablabla</span>
      </div>
    );
  }
}

export default ExtraSelectWidget;
