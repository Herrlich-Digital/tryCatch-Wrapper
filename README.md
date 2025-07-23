# TryCatch-Wrapper

![Release-Package](https://github.com/Herrlich-Digital/tryCatch-Wrapper/actions/workflows/release-package.yml/badge.svg)

## Overview

TryCatch-Wrapper is a lightweight utility designed to simplify error handling in TypeScript applications. It provides a structured approach to handling asynchronous errors using a `Result` type pattern, ensuring better code maintainability and readability.

## Installation

You can install the package from GitHub Packages using bun:

```sh
bun add @pr0gstar/trycatch-wrapper
```

or using npm:

```sh
npm install @pr0gstar/trycatch-wrapper
```

or using yarn:

```sh
yarn add @pr0gstar/trycatch-wrapper
```

## Usage

### API

The core function of this package is:

```ts
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
```

### Basic Example

```ts
import { tryCatch } from "@pr0gstar/trycatch-wrapper";

async function fetchData(): Promise<string> {
  return await fetch("https://api.example.com/data").then((res) => res.json());
}

(async () => {
  const { data, error } = await tryCatch(fetchData());
  if (error) throw error;
  console.log("Fetched data:", data);
})();
```

### Handling Different Error Types

```ts
interface CustomError {
  message: string;
  code: number;
}

const { data, error } = await tryCatch<string, CustomError>(
  Promise.reject({ message: "Something went wrong", code: 500 }),
);

if (error) throw new Error(`Error ${error.code}: ${error.message}`);

console.log("Success:", data);
```

## Benefits

- **Type Safety**: Ensures that both success and failure cases are handled properly.
- **Avoids Try-Catch Blocks Everywhere**: Simplifies error handling for async operations.
- **Structured Error Handling**: Uses a `Result<T, E>` type pattern for better maintainability.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

Developed by Christoph Planken.

## Links

- [GitHub Repository](https://github.com/pr0gstar/trycatch-wrapper)
- [GitHub Packages](https://github.com/pr0gstar?tab=packages)
