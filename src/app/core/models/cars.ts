export const getRandomName = () => {
  return carNames[Math.floor(Math.random() * carNames.length)];
};

export const getRandomColor = () => {
  const getRandomHex = () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0');
  return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
};

export const carNames = [
  'Honda CR-V',
  'BMW X5',
  'Toyota Corolla',
  'Ford Mustang',
  'Chevrolet Camaro',
  'Nissan Altima',
  'Hyundai Elantra',
  'Kia Optima',
  'Jeep Wrangler',
  'Mazda CX-5',
  'Subaru Outback',
  'Volkswagen Golf',
  'Audi A4',
  'Mercedes-Benz C-Class',
  'Lexus RX',
  'Volvo XC90',
  'Porsche 911',
  'Jaguar F-Pace',
  'Land Rover Range Rover',
  'Tesla Model S',
  'Honda Accord',
  'BMW 3 Series',
  'Toyota Camry',
  'Ford F-150',
  'Chevrolet Silverado',
  'Nissan Rogue',
  'Hyundai Sonata',
  'Kia Sportage',
  'Jeep Cherokee',
  'Mazda 3',
  'Subaru Forester',
  'Volkswagen Passat',
  'Audi Q5',
  'Mercedes-Benz E-Class',
  'Lexus ES',
  'Volvo S60',
  'Porsche Cayenne',
  'Jaguar XE',
  'Land Rover Discovery',
  'Tesla Model X',
  'Honda Civic',
  'BMW 5 Series',
  'Toyota Highlander',
  'Ford Explorer',
  'Chevrolet Tahoe',
  'Nissan Murano',
  'Hyundai Tucson',
  'Kia Sorento',
  'Jeep Grand Cherokee',
  'Mazda 6',
  'Subaru Crosstrek',
  'Volkswagen Jetta',
  'Audi A6',
  'Mercedes-Benz GLE',
  'Lexus GX',
  'Volvo V60',
  'Porsche Macan',
  'Jaguar F-Type',
  'Land Rover Defender',
  'Tesla Model 3',
  'Honda Pilot',
  'BMW X3',
  'Toyota RAV4',
  'Ford Edge',
  'Chevrolet Traverse',
  'Nissan Pathfinder',
  'Hyundai Santa Fe',
  'Kia Telluride',
  'Jeep Renegade',
  'Mazda MX-5',
  'Subaru Impreza',
  'Volkswagen Tiguan',
  'Audi Q7',
  'Mercedes-Benz GLB',
  'Lexus NX',
  'Volvo XC60',
  'Porsche Panamera',
  'Jaguar E-Pace',
  'Land Rover Evoque',
  'Tesla Model Y',
  'Honda HR-V',
  'BMW X7',
  'Toyota Avalon',
  'Ford Expedition',
  'Chevrolet Equinox',
  'Nissan Frontier',
  'Hyundai Kona',
  'Kia Stinger',
  'Jeep Compass',
  'Mazda CX-9',
  'Subaru Ascent',
  'Volkswagen Atlas',
  'Audi A8',
  'Mercedes-Benz S-Class',
  'Lexus LS',
  'Volvo XC40',
  'Porsche Taycan',
  'Jaguar I-Pace',
  'Land Rover Velar',
  'Tesla Cybertruck',
];
