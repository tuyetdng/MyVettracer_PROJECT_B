import React, { useMemo } from "react";
import { View } from "react-native";
import Text from "../../shared/components/text-wrapper/TextWrappers";
import { useTheme } from "@react-navigation/native";
import createStyles from "./AppointmentScreen.style";

const AppointmentScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
      Appointment
      </Text>
    </View>
  );
};

export default AppointmentScreen;
