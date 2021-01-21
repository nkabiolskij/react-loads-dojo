import renderer, { create, tsx } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import Wrapper from './widgets/Wrapper';

import customTheme from './theme/custom/index';

const factory = create({theme});

const App = factory(function App({ middleware: { theme }}) {
    if (!theme.get()) {
        theme.set(customTheme);
    }

    return (
        <div>
            <Wrapper onClick={() => {}}/>
        </div>
    );
})

const r = renderer(() => <App />);
r.mount();
