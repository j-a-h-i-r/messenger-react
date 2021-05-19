import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const ShadowButton = withStyles({
  root: {
    padding: '1rem 2rem',
    borderRadius: '5px',
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
  },
})(Button);
