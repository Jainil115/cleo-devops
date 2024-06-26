'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import Modal from "../Modal";
import Heading from "../../reusable/Heading";
import Input from "../../reusable/Input";
import axios from 'axios';
import toast from "react-hot-toast";
import useCreateModal from "@/hooks/useLoginModal";
import useSuccessModal from "@/hooks/useSuccessModal";
import createProjectMember from "@/actions/createProjectMember";
import useResourceModal from "@/hooks/createModalHooks/useResourceModal";
import Textarea from "../../reusable/Textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Calendar } from "../../ui/calendar";
import { ProgressBar } from "../../ProgressBar";

enum STEPS {
  DESCRIPTION = 0,
  ROLE = 1,
  COMMENT = 2,
  DATES = 3,
}

interface ResourceModalProps {
  user: any;
  project: any
}
const ResourceModal = ({
  user,
  project
}: ResourceModalProps) => {

  const router = useRouter();
  const resourceModal = useResourceModal();
  const [step, setStep] = useState(STEPS.DESCRIPTION);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
        errors,
    },
    reset
    } = useForm<FieldValues>({
        defaultValues: {
            projectId: project.id,
            name: '',
            role: '',
            comment: '',
            startDate: undefined,
            endDate: undefined,
    }})

    useEffect(() => {
        if (startDate) {
        setValue("startDate", startDate);
        }
    }, [startDate, setValue]);

    useEffect(() => {
        if (endDate) {
        setValue("endDate", endDate);
        }
    }, [endDate, setValue]);


  const onBack = () => {
      setStep((value) => value - 1);
  }
  const onNext = () => {
      setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.DATES){
      return onNext();
    }
    setIsLoading(true)
    console.log(data);
    axios.post('/api/resources', data)
        .then(() => {
            router.refresh();
            toast.success('Resource added');
        }) .catch((error) => {
            toast.error(error.response.data);
        }) .finally(() => {
            setIsLoading(false);
            resourceModal.onClose()
    })
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.DATES){
        return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.DESCRIPTION){
          return undefined;
      }
      return 'Back'
  }, [step]);


  const progress = useMemo(() => {
    return (step / (Object.keys(STEPS).length / 2 - 1)) * 100;
  }, [step]);



  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Resource name"
        subtitle=""
        center
      />
        <motion.div
            key="name"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
    </div>
  )

  if (step === STEPS.ROLE){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Add role"
          subtitle=""
          center
        />
        <motion.div
            key="role"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Input
            id="role"
            label="Role"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
        
      </div>
    )
  }

  if (step === STEPS.COMMENT){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Comment"
          subtitle=""
          center
        />
        <motion.div
            key="comment"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Textarea
            id="comment"
            label="Comment"
            disabled={isLoading}
            register={register}  
            errors={errors}
            required
          />
        </motion.div>
      </div>
    )
  }

    if (step === STEPS.DATES){
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Dates"
          subtitle=""
          center
        />
        <motion.div
            key="startDate"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-full border-[1px] border-neutral-300 rounded-[5px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </motion.div>
        <motion.div
            key="endDate"
            initial={{ opacity: 0, x: "-50%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-full border-[1px] border-neutral-300 rounded-[5px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[9999] bg-neutral-200 rounded-[10px]" align="start">
                <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                />
            </PopoverContent>
            </Popover>
        </motion.div>
      </div>
    )
  }



  return (
    <Modal
      disabled={isLoading}
      isOpen={resourceModal.isOpen}
      title="Add resource"
      actionLabel={actionLabel}
      onClose={resourceModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.DESCRIPTION ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-6 items-center">
          <div className="w-[90%] dark:bg-neutral-800 bg-gray-200 h-[2px] rounded-full">
            <ProgressBar currentStep={step} totalSteps={Object.keys(STEPS).length / 2} />
          </div>
          <div className="w-full">
            {bodyContent}
          </div>
        </div>
      }
    />
  );
}

export default ResourceModal;