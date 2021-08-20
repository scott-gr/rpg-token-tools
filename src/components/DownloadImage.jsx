/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';


const DownloadImage = (props) => {
  return (
    <div css={props.usecss} onClick={props.handleclick}>
      {props.children}
    </div>
  );
};
export default DownloadImage;