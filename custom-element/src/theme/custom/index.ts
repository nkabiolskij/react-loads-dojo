import * as button from './button.m.css';
import * as wrapper from './wrapper.m.css';
import * as defaultVariant from './variants/default.m.css';

const theme = {
	theme: {
        '@dojo/widgets/button': button,
        'example-ce/wrapper': wrapper
	},
	variants: {
		default: defaultVariant
	}
};

export default theme;

