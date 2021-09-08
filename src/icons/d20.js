// icon:hexagon-slice-6 | Material Design Icons https://materialdesignicons.com/ | Austin Andrews
import styled from '@emotion/styled';

const D20svg = styled.svg`
  color: var(--appwhite);
  fill: var(--appwhite);
  opacity: 100%;
  background-color: transparent;
  height: var(--s1);
  width: var(--s1);
  margin: 0;
  padding: 0;
  vertical-align: -0.4em;
`;

function D20Icon() {
  return (
    <D20svg viewBox="0 0 24 24">
      <path d="M12 5.32l6 3.37v6.62l-6 3.37-6-3.37V8.69l6-3.37m9 11.18c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9M12 4.15L5 8.09v7.82l7 3.94 7-3.94V8.09l-7-3.94z" />
    </D20svg>
  );
}

export default D20Icon;
