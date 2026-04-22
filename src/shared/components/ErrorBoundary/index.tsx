import React, { useMemo } from "react";
import { View, Text } from "react-native";

import { useAppTheme } from "@theme/ThemeContext";

import { createStyles } from "./styles";
import { strings } from "./strings";
import { Button } from "@components";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface BoundaryProps extends Props {
  styles: ReturnType<typeof createStyles>;
}

class ErrorBoundaryBase extends React.Component<BoundaryProps, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;

    const { styles } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{strings.title}</Text>

          <Text style={styles.message}>
            {this.state.error?.message ?? strings.error}
          </Text>
        </View>

        <View style={styles.footer}>
          <Button label={strings.button} onPress={this.reset} />
        </View>
      </View>
    );
  }
}

export function ErrorBoundary({ children }: Props) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return <ErrorBoundaryBase styles={styles}>{children}</ErrorBoundaryBase>;
}
