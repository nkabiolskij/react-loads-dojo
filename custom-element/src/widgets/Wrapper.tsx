import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Button from '@dojo/widgets/button';

import * as css from './wrapper.m.css';

const factory = create({ theme }).properties<{ onClick: () => void }>();

export default factory(function Wrapper({ properties, middleware: { theme }}) {
    const { theme: themeProp, classes, onClick } = properties();
    const themedCss = theme.classes(css);
    return (
        <div classes={[themedCss.root]}>
            <Button onClick={onClick} theme={themeProp} classes={classes}>Custom</Button>
        </div>
    );
})