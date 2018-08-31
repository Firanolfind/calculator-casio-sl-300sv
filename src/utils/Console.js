import Console from 'loglevel';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  Console.setLevel(Console.levels.TRACE);
} else {
  Console.setLevel(Console.levels.SILENT);
}

export default Console;
