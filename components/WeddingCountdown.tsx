import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WeddingCountdownProps {
  isLandscape: boolean;
}

export function WeddingCountdown({ isLandscape }: WeddingCountdownProps) {
  const weddingDate = new Date('2027-05-07T18:00:00');
  const getTimeUntilWedding = () => Math.max(0, Math.floor((weddingDate.getTime() - Date.now()) / 1000));
  const [timeUntilWedding, setTimeUntilWedding] = useState(getTimeUntilWedding);

  useEffect(() => {
    const interval = setInterval(() => setTimeUntilWedding(getTimeUntilWedding()), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownUnits = [
    { value: Math.floor(timeUntilWedding / 86400), label: 'DÍAS' },
    { value: Math.floor((timeUntilWedding % 86400) / 3600), label: 'HORAS' },
    { value: Math.floor((timeUntilWedding % 3600) / 60), label: 'MINUTOS' },
    { value: timeUntilWedding % 60, label: 'SEGUNDOS' },
  ];

  return (
    <View id="wedding-countdown" style={[styles.countdown, isLandscape ? styles.landscapeCountdown : styles.portraitCountdown]}>
      <View style={styles.countdownUnits}>
        {countdownUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <View style={styles.countdownUnit}>
              <Text style={[styles.countdownValue, isLandscape ? styles.landscapeCountdownValue : styles.portraitCountdownValue]}>
                {String(unit.value).padStart(2, '0')}
              </Text>
              <Text style={[styles.countdownLabel, isLandscape ? styles.landscapeCountdownLabel : styles.portraitCountdownLabel]}>
                {unit.label}
              </Text>
            </View>
            {index < countdownUnits.length - 1 && (
              <View style={styles.countdownUnit}>
                <Text style={[styles.countdownValue, isLandscape ? styles.landscapeCountdownValue : styles.portraitCountdownValue]}>:</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countdown: {
    alignItems: 'center',
    verticalAlign: 'middle',
  },
  countdownUnits: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countdownUnit: {
    alignItems: 'center',
  },
  countdownValue: {
    fontFamily: 'CormorantGaramond_300Light',
    color: 'white',
    textAlign: 'center',
  },
  countdownLabel: {
    fontFamily: 'CormorantGaramond_300Light',
    color: 'white',
    textAlign: 'center',
    
  },
  // Landscape styles
  landscapeCountdown: {
    width: 410,
    marginTop: 5,
  },
  landscapeCountdownValue: {
    fontSize: 38,
    letterSpacing: 4,
  },
  landscapeCountdownLabel: {
    fontSize: 13,
    letterSpacing: 1,
    width: 88,
    marginTop: 4,
  },
 // Portrait styles
  portraitCountdown: {
    marginTop: 10,
    width: '50%',
    letterSpacing: 5,
  },
  portraitCountdownValue: {
    fontSize: 32,
    
  },
  portraitCountdownLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    width: 68,
    marginTop: 8,
  },
});
