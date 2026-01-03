import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ClientOnly } from "./client-only";

describe("ClientOnly", () => {
  it("renders children", () => {
    render(
      <ClientOnly>
        <div data-testid="child">content</div>
      </ClientOnly>,
    );
    // Since we are in jsdom, we are "client-side" mostly?
    // Actually useIsClient might return false initially in some setups or true.
    // In jsdom environment, it usually behaves like a client.
    expect(screen.getByTestId("child")).toBeDefined();
  });
});
