import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BarcodeForm from "./BarcodeForm";

describe("BarcodeForm", () => {
  it("calls onChange and onSubmit", async () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();

    render(
      <BarcodeForm
        value=""
        error={null}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );

    const input = screen.getByLabelText(/barcode number/i);

    await userEvent.type(input, "AA123");

    // called for each character
    expect(onChange).toHaveBeenCalled();

    await userEvent.click(
      screen.getByRole("button", { name: /validate your barcode/i })
    );

    expect(onSubmit).toHaveBeenCalled();
  });
});
