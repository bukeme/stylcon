"use client";

import api from "@/api";
import useAuthStore from "@/components/authStore";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import Input from "@/components/Shared/Input";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Shipping = ({
  shipping,
  setShipping,
  onCancle,
  shippingData,
  isLoading,
}) => {
  const { setReload } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const saveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch("/api/accounts/user-delivery/", {
        address1: shipping.address1,
        address2: shipping.address2,
        zip_code: shipping.zipCode,
        city: shipping.city,
        country: shipping.country,
        phone1: shipping.phone1,
        phone2: shipping.phone2,
      });

      toast.success(res.message || "Shipping details updated");
      setReload();
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.detail || err.response?.messsage || err.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={saveChanges} className="w-full max-w-[642px] mx-auto">
      <h2 className="text-3xl font-bold border-b-2 border-grey/15 pb-3 mb-2">
        Shipping and billing address
      </h2>
      <div className="flex flex-col mt-6">
        <p className="font-bold">Delivery Address</p>
        {isLoading ? (
          <div className="flex flex-col gap-4 mt-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Skeleton key={num} className={"h-16 w-full"} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              name={"address1"}
              type="text"
              className={"h-[53px]"}
              value={shipping.address1}
              setValue={(val) =>
                setShipping((prev) => {
                  return { ...prev, address1: val };
                })
              }
              label={""}
              placeHolder={"Address 1"}
              errMsg={false}
            />
            <Input
              name={"address2"}
              type="text"
              className={"h-[53px]"}
              value={shipping.address2}
              setValue={(val) =>
                setShipping((prev) => {
                  return { ...prev, address2: val };
                })
              }
              label={""}
              placeHolder={"Address 2"}
              errMsg={false}
            />
            <div className="flex gap-2.5">
              <Input
                name={"zipCode"}
                type="text"
                className={"h-[53px]"}
                value={shipping.zipCode}
                setValue={(val) =>
                  setShipping((prev) => {
                    return { ...prev, zipCode: val };
                  })
                }
                label={""}
                placeHolder={"Zip Code"}
                errMsg={false}
              />
              <Input
                name={"city"}
                type="text"
                className={"h-[53px]"}
                value={shipping.city}
                setValue={(val) =>
                  setShipping((prev) => {
                    return { ...prev, city: val };
                  })
                }
                label={""}
                placeHolder={"City"}
                errMsg={false}
              />
            </div>
            <Input
              name={"country"}
              type="text"
              className={"h-[53px]"}
              value={shipping.country}
              setValue={(val) =>
                setShipping((prev) => {
                  return { ...prev, country: val };
                })
              }
              label={""}
              placeHolder={"Country"}
              errMsg={false}
            />
            <p className="font-bold mt-1">Contact</p>
            <Input
              name={"phoneNumber1"}
              type="number"
              className={"h-[53px]"}
              value={shipping.phone1}
              setValue={(val) =>
                setShipping((prev) => {
                  return { ...prev, phone1: val };
                })
              }
              label={""}
              placeHolder={"Phone Number 1"}
              errMsg={false}
            />
            <Input
              name={"phoneNumber2"}
              type="number"
              className={"h-[53px]"}
              value={shipping.phone2}
              setValue={(val) =>
                setShipping((prev) => {
                  return { ...prev, phone2: val };
                })
              }
              label={""}
              placeHolder={"Phone Number 2"}
              errMsg={false}
            />
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <ButtonBlack
            handleClick={() => onCancle(shippingData)}
            text={"Cancel"}
            className={
              "w-full justify-center sm:w-fit !bg-transparent !text-dark border border-dark"
            }
          />
          <ButtonBlack
            text={
              loading ? <Loader className="animate-spin" /> : "Save changes"
            }
            className={"w-full justify-center sm:w-fit"}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default Shipping;
