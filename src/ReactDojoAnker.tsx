import theme from "@dojo/framework/core/middleware/theme";
import Registry from "@dojo/framework/core/Registry";
import renderer, { create, w } from "@dojo/framework/core/vdom";
import Button from "@dojo/widgets/button";
import dojo from "@dojo/widgets/theme/dojo";
import React from "react";
import { registerThemeInjector } from "@dojo/framework/core/mixins/Themed";

export class ReactDojoAnker extends React.Component<{ onClick: () => void }> {
    private static id = "react-dojo-connector-dom";

    render() {
        return (
            <div style={{ padding: "20px" }}>
                <h3>React SPA</h3>
                <div id={ReactDojoAnker.id}></div>
            </div>
        );
    }

    componentDidMount() {
        const registry = new Registry();

        registerThemeInjector(dojo, registry);

        renderer(() => w(ButtonWrapper, { onClick: this.props.onClick })).mount({
            registry,
            domNode: document.getElementById(ReactDojoAnker.id)
        });
    }
}

const factory = create({ theme }).properties<{ onClick: () => void }>();

const ButtonWrapper = factory(({ middleware: { theme }, properties }) => {
    if (!theme.get()) {
        console.log("theme from wrapper");
        theme.set(dojo);
        console.log(theme.get());
    }
    const { onClick } = properties();
    return w(Button, { onClick }, ["Dojo-Button"]);
});
