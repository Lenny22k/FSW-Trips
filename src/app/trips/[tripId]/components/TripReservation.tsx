"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

export function TripReservation({
  tripStartDate,
  tripEndDate,
  maxGuests,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log({ data });
  };

  const starDate = watch("startDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data de Início"
              className="w-full"
              minDate={tripStartDate}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholderText="Data Final"
              className="w-full"
              maxDate={tripEndDate}
              minDate={starDate ?? tripStartDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
        })}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">Rs$2500</p>
      </div>

      <div className="pb-10 border-b border-b-grayLighter w-full">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-3 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}