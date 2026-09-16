<script setup>
/**
 * ContactView — a working enquiry form (PrimeVue fields + Toast),
 * the studio directory, and a hand-drawn location card so the page
 * never depends on a third-party map tile to look finished.
 */
import { ref, reactive, onMounted } from 'vue'
import { contact, brand, socials } from '@/data/site'
import { contactReasons, faqs } from '@/data/content'

import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import EyebrowLabel from '@/components/ui/EyebrowLabel.vue'
import MagneticButton from '@/components/ui/MagneticButton.vue'

import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  reason: null,
  message: '',
  consent: false
})
const errors = reactive({})
const sending = ref(false)

const reasonOptions = contactReasons.map((r) => ({ label: r, value: r }))

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (form.name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!/^[0-9+\-\s()]{8,16}$/.test(form.phone.trim())) errors.phone = 'Enter a reachable phone number.'
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "That email doesn't look right."
  if (!form.reason) errors.reason = 'Pick the closest match.'
  if (form.message.trim().length < 10) errors.message = 'A sentence or two about the space, please.'
  if (!form.consent) errors.consent = 'We need your permission to reply.'
  return Object.keys(errors).length === 0
}

function submit() {
  if (!validate()) {
    toast.add({
      severity: 'warn',
      summary: 'Almost there',
      detail: 'Please check the highlighted fields.',
      life: 3600
    })
    return
  }
  sending.value = true

  // Static site — swap this block for your endpoint when you have one.
  setTimeout(() => {
    sending.value = false
    toast.add({
      severity: 'success',
      summary: 'Enquiry received',
      detail: `Thank you, ${form.name.split(' ')[0]}. A designer will call you within one working day.`,
      life: 5200
    })
    form.name = ''
    form.phone = ''
    form.email = ''
    form.reason = null
    form.message = ''
    form.consent = false
  }, 1100)
}

onMounted(() => {
  document.title = 'Contact — Vraj Interior'
})
</script>

<template>
  <div class="bg-ivory">
    <PageHero
      eyebrow="Contact"
      index="05"
      crumb="Contact"
      title="Let's talk about your space."
      lede="Call, write, or send the form below. The first conversation is free and there is no obligation — we will tell you honestly if we are the right studio for the job."
    />

    <!-- ================= FORM + DIRECTORY ================= -->
    <section class="py-20 md:py-24 lg:py-28">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <!-- Form -->
        <div v-reveal="{ delay: 0.05 }" class="js-reveal lg:col-span-7">
          <EyebrowLabel text="Enquiry" index="01" />
          <h2 class="mt-6 font-display text-display-sm font-light text-walnut">
            Tell us a little about the project
          </h2>
          <p class="mt-4 max-w-prose2 text-[0.93rem] leading-[1.9] text-stone">
            The more you share — room sizes, a floor plan, photographs, a budget
            range — the more useful our first reply will be.
          </p>

          <form class="vj-field mt-10 flex flex-col gap-7" novalidate @submit.prevent="submit">
            <div class="grid gap-7 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <label for="name" class="text-micro uppercase tracking-widest2 text-taupe">
                  Your name *
                </label>
                <InputText id="name" v-model="form.name" placeholder="Meera Shah" autocomplete="name" />
                <small v-if="errors.name" class="text-[0.74rem] text-brass-deep">{{ errors.name }}</small>
              </div>

              <div class="flex flex-col gap-2">
                <label for="phone" class="text-micro uppercase tracking-widest2 text-taupe">
                  Phone *
                </label>
                <InputText id="phone" v-model="form.phone" placeholder="+91 98250 00000" inputmode="tel" autocomplete="tel" />
                <small v-if="errors.phone" class="text-[0.74rem] text-brass-deep">{{ errors.phone }}</small>
              </div>
            </div>

            <div class="grid gap-7 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <label for="email" class="text-micro uppercase tracking-widest2 text-taupe">Email</label>
                <InputText id="email" v-model="form.email" placeholder="you@example.com" inputmode="email" autocomplete="email" />
                <small v-if="errors.email" class="text-[0.74rem] text-brass-deep">{{ errors.email }}</small>
              </div>

              <div class="flex flex-col gap-2">
                <label for="reason" class="text-micro uppercase tracking-widest2 text-taupe">
                  What do you need? *
                </label>
                <Select
                  id="reason"
                  v-model="form.reason"
                  :options="reasonOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Choose one"
                  :pt="{ overlay: { class: 'vj-select-panel' } }"
                />
                <small v-if="errors.reason" class="text-[0.74rem] text-brass-deep">{{ errors.reason }}</small>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label for="message" class="text-micro uppercase tracking-widest2 text-taupe">
                About the space *
              </label>
              <Textarea
                id="message"
                v-model="form.message"
                rows="5"
                placeholder="A 3BHK in Satellite, around 1,400 sq ft. We would like to redo the kitchen and both wardrobes…"
              />
              <small v-if="errors.message" class="text-[0.74rem] text-brass-deep">{{ errors.message }}</small>
            </div>

            <div class="vj-check flex items-start gap-3">
              <Checkbox v-model="form.consent" input-id="consent" :binary="true" />
              <label for="consent" class="text-[0.83rem] leading-relaxed text-stone">
                I agree that {{ brand.name }} may contact me about this enquiry. *
              </label>
            </div>
            <small v-if="errors.consent" class="-mt-4 text-[0.74rem] text-brass-deep">{{ errors.consent }}</small>

            <div class="flex flex-wrap items-center gap-6 pt-1">
              <Button
                type="submit"
                :loading="sending"
                class="rounded-full !bg-walnut !px-9 !py-3.5 !text-[0.72rem] !uppercase !tracking-widest2 !text-ivory hover:!bg-brass-deep"
              >
                {{ sending ? 'Sending…' : 'Send enquiry' }}
              </Button>
              <span class="text-[0.78rem] text-taupe">
                Or call
                <a :href="contact.phoneHref" v-cursor="'link'" class="link-draw text-walnut">{{ contact.phone }}</a>
              </span>
            </div>
          </form>
        </div>

        <!-- Directory -->
        <aside v-reveal="{ delay: 0.12 }" class="js-reveal lg:col-span-5">
          <EyebrowLabel text="Studio" index="02" />

          <div class="mt-6 flex flex-col gap-8">
            <!-- Address -->
            <div class="border-t border-linen pt-7">
              <h3 class="text-micro uppercase tracking-widest2 text-taupe">Visit</h3>
              <address class="mt-3 font-display text-[1.3rem] font-light not-italic leading-snug text-walnut">
                {{ contact.address.line1 }}<br />
                {{ contact.address.line2 }}<br />
                {{ contact.address.city }}, {{ contact.address.region }}<br />
                {{ contact.address.pincode }}
              </address>
              <a
                :href="contact.mapLink"
                target="_blank"
                rel="noopener noreferrer"
                v-cursor="'link'"
                class="link-draw mt-4 inline-block text-[0.8rem] uppercase tracking-widest2 text-brass-deep"
              >
                Open in Maps
              </a>
            </div>

            <!-- Direct lines -->
            <div class="border-t border-linen pt-7">
              <h3 class="text-micro uppercase tracking-widest2 text-taupe">Reach us</h3>
              <div class="mt-3 flex flex-col gap-2.5">
                <a
                  :href="contact.phoneHref"
                  v-cursor="'link'"
                  class="link-draw self-start font-display text-[1.25rem] text-walnut"
                >
                  {{ contact.phone }}
                </a>
                <a
                  :href="contact.altPhoneHref"
                  v-cursor="'link'"
                  class="link-draw self-start text-[0.95rem] text-stone hover:text-brass-deep"
                >
                  {{ contact.altPhone }}
                </a>
                <a
                  :href="contact.emailHref"
                  v-cursor="'link'"
                  class="link-draw self-start text-[0.95rem] text-stone hover:text-brass-deep"
                >
                  {{ contact.email }}
                </a>
              </div>
            </div>

            <!-- Hours -->
            <div class="border-t border-linen pt-7">
              <h3 class="text-micro uppercase tracking-widest2 text-taupe">Studio hours</h3>
              <dl class="mt-3 flex flex-col gap-2.5 text-[0.9rem]">
                <div v-for="h in contact.hours" :key="h.day" class="flex items-baseline justify-between gap-6">
                  <dt class="text-stone">{{ h.day }}</dt>
                  <dd class="text-walnut">{{ h.time }}</dd>
                </div>
              </dl>
            </div>

            <!-- Social -->
            <div class="border-t border-linen pt-7">
              <h3 class="text-micro uppercase tracking-widest2 text-taupe">Follow</h3>
              <ul class="mt-4 flex flex-wrap gap-2.5">
                <li v-for="s in socials" :key="s.label">
                  <a
                    :href="s.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    v-cursor="'link'"
                    class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-linen text-[0.62rem] uppercase tracking-widest2 text-stone transition-all duration-500 ease-silk hover:border-brass hover:bg-brass hover:text-ivory"
                  >
                    {{ s.short }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ================= LOCATION CARD ================= -->
    <section class="bg-porcelain py-20 md:py-24">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <SectionHeading
            eyebrow="Getting here"
            title="In the middle of the city, easy to park"
            italic-word="park"
            lede="We are on C.G. Road, a minute from Girish Cold Drinks. Visitor parking is available in the basement of the building."
          />
          <div class="mt-8">
            <MagneticButton :href="contact.mapLink" label="Get directions" variant="outline" />
          </div>
        </div>

        <!-- Hand-built map illustration (no third-party tiles) -->
        <div v-reveal="{ type: 'clip' }" class="js-reveal lg:col-span-7">
          <div class="relative h-[340px] w-full overflow-hidden border border-linen bg-ivory md:h-[420px]">
            <svg class="absolute inset-0 h-full w-full text-linen/70" viewBox="0 0 800 460" fill="none" aria-hidden="true">
              <path d="M-20 120 H820" stroke="currentColor" stroke-width="26" />
              <path d="M-20 300 H820" stroke="currentColor" stroke-width="14" />
              <path d="M180 -20 V480" stroke="currentColor" stroke-width="20" />
              <path d="M520 -20 V480" stroke="currentColor" stroke-width="10" />
              <path d="M-20 400 L820 90" stroke="currentColor" stroke-width="6" stroke-dasharray="2 16" stroke-linecap="round" />
              <rect x="300" y="150" width="150" height="105" fill="#E9E0D1" />
              <rect x="560" y="200" width="110" height="80" fill="#E9E0D1" />
              <rect x="60" y="330" width="120" height="70" fill="#E9E0D1" />
              <circle cx="247" cy="235" r="86" fill="#B08D57" opacity="0.07" />
              <circle cx="247" cy="235" r="52" fill="#B08D57" opacity="0.10" />
            </svg>

            <div class="absolute left-[30.9%] top-[51%] -translate-x-1/2 -translate-y-1/2">
              <span class="relative flex h-4 w-4 items-center justify-center">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass/50" />
                <span class="relative inline-flex h-3 w-3 rounded-full bg-brass ring-4 ring-ivory" />
              </span>
            </div>

            <div class="absolute bottom-5 left-5 bg-ivory/95 px-5 py-4 shadow-[0_20px_50px_-30px_rgba(74,59,44,0.45)] backdrop-blur-sm">
              <span class="block text-micro uppercase tracking-widest2 text-brass-deep">Studio</span>
              <span class="mt-1 block font-display text-[1.1rem] text-walnut">Vraj Interior</span>
              <span class="mt-0.5 block text-[0.78rem] text-stone">C.G. Road, Ahmedabad 380009</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="py-20 md:py-24 lg:py-28">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions clients ask first"
            italic-word="first"
          />
        </div>
        <div class="lg:col-span-8">
          <Accordion :value="null" class="vj-accordion">
            <AccordionPanel v-for="(f, i) in faqs.slice(0, 4)" :key="i" :value="String(i)" class="!border-0 !bg-transparent">
              <AccordionHeader>
                <span class="flex items-baseline gap-4">
                  <span class="text-[0.68rem] tracking-widest2 text-brass">{{ String(i + 1).padStart(2, '0') }}</span>
                  {{ f.q }}
                </span>
              </AccordionHeader>
              <AccordionContent>
                <p class="max-w-prose2">{{ f.a }}</p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </section>
  </div>
</template>
